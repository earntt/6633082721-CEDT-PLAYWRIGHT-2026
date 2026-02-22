import { test, expect } from '@playwright/test'
import users from '../test-data/users/users.json'

test.describe('EX02-assertion.spec.ts', async () => {
	test.beforeEach(async ({ page }) => {
		// Arrange Step: Navigate to the login page
		await page.goto('https://katalon-demo-cura.herokuapp.com/')

		// Act Step: Click on the "Make Appointment" link to go to the login page
		await page.getByRole('link', { name: 'Make Appointment' }).click()

		// Arrange Step: Fill in the username and password fields with valid credentials
		await page.getByLabel('Username').fill(users.validUser.username)
		await page.getByLabel('Password').fill(users.validUser.password)

		// Act and Wait Step: Click the "Login" button and wait for the navigation to the appointment page to complete.
		await Promise.all([
			page.waitForURL('**/#appointment'),
			page.getByRole('button', { name: 'Login' }).click(),
		])
	})

	test('Verify that make appointment page display “Make Appointment” in h2 @happy', async ({
		page,
	}) => {
		// Assert Step: Verify that the user is successfully logged in by checking for a specific element on the landing page
		await expect(page.locator('h2')).toHaveText('Make Appointment')
	})

	test('Verify that can select all facility combo boxes @happy', async ({
		page,
	}) => {
		const facilitySelect = page.getByRole('combobox', { name: 'Facility' })

		// Assert Step: Verify that the facility dropdown is enabled and can be interacted with
		await expect(facilitySelect).toBeEnabled()

		await facilitySelect.selectOption('Tokyo CURA Healthcare Center')
		await expect(facilitySelect).toHaveValue('Tokyo CURA Healthcare Center')

		await facilitySelect.selectOption('Hongkong CURA Healthcare Center')
		await expect(facilitySelect).toHaveValue('Hongkong CURA Healthcare Center')

		await facilitySelect.selectOption('Seoul CURA Healthcare Center')
		await expect(facilitySelect).toHaveValue('Seoul CURA Healthcare Center')
	})

	test('Verify that can select apply for hospital readmission checkbox @happy', async ({
		page,
	}) => {
		const hospitalReadmissionCheckbox = page.getByRole('checkbox', {
			name: 'Apply for hospital readmission',
		})

		// Assert Step: Verify that the hospital readmission checkbox is enabled and can be interacted with
		await expect(hospitalReadmissionCheckbox).toBeEnabled()
		await hospitalReadmissionCheckbox.check()
		await expect(hospitalReadmissionCheckbox).toBeChecked()
		await expect(hospitalReadmissionCheckbox).toHaveValue('Yes')
	})

	test('Verify that can select health care program radio button @happy', async ({
		page,
	}) => {
		const healthcareProgramRadioButtons = await page
			.locator('input[type="radio"]')
			.all()

		await healthcareProgramRadioButtons[0].check()
		await expect(healthcareProgramRadioButtons[0]).toBeChecked()
		await expect(healthcareProgramRadioButtons[0]).toHaveValue('Medicare')

		await healthcareProgramRadioButtons[1].check()
		await expect(healthcareProgramRadioButtons[1]).toBeChecked()
		await expect(healthcareProgramRadioButtons[1]).toHaveValue('Medicaid')

		await healthcareProgramRadioButtons[2].check()
		await expect(healthcareProgramRadioButtons[2]).toBeChecked()
		await expect(healthcareProgramRadioButtons[2]).toHaveValue('None')
	})

	test('Verify that can input current date on Visit Date @happy', async ({
		page,
	}) => {
		const visitDateInput = page.getByRole('textbox', {
			name: 'Visit Date (Required)',
		})

		// Assert Step: Verify that the visit date input field is enabled and can be interacted with
		await expect(visitDateInput).toBeEnabled()
		await visitDateInput.click()

		const datepickerDropdown = page.locator(
			'.datepicker.datepicker-dropdown.dropdown-menu.datepicker-orient-left.datepicker-orient-top'
		)
		await expect(datepickerDropdown).toBeVisible()

		const datepickerTable = datepickerDropdown.locator('table.table-condensed')

		const datepickerMonthYearHeader = datepickerTable
			.locator('th.datepicker-switch')
			.first()
		await expect(datepickerMonthYearHeader).toHaveText(
			new Date().toLocaleDateString('en-GB', {
				timeZone: 'Asia/Bangkok',
				month: 'long',
				year: 'numeric',
			})
		)

		const datepickerDayCells = datepickerTable.locator('td.day')
		await datepickerDayCells.getByText(new Date().getDate().toString()).click()

		const currentFullDate = new Date().toLocaleDateString('en-GB', {
			// Get current date in DD-MM-YYYY format
			timeZone: 'Asia/Bangkok',
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		})
		await expect(visitDateInput).toHaveValue(currentFullDate)
	})

	test('Verify that can input comment @happy', async ({ page }) => {
		const commentInput = page.getByRole('textbox', {
			name: 'Comment',
		})

		// Assert Step: Verify that the comment input field is enabled and can be interacted with
		await expect(commentInput).toBeEnabled()
		await expect(commentInput).toBeEditable()

		await commentInput.fill('This is a test comment.')
		await expect(commentInput).toHaveValue('This is a test comment.')
	})

	test('Verify that book appointment button is displayed and enabled @happy', async ({
		page,
	}) => {
		const bookAppointmentButton = page.getByRole('button', {
			name: 'Book Appointment',
		})

		// Assert Step: Verify that the book appointment button is enabled and can be interacted with
		await expect(bookAppointmentButton).toBeVisible()
		await expect(bookAppointmentButton).toBeEnabled()
	})
})
