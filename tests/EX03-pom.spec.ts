import { test, expect } from '../fixtures'
import users from '../test-data/users/users.json'
import {
	facilities,
	programs,
	readmission,
} from '../test-data/appointments/appointments.json'

test.describe('EX03-pom.spec.ts', () => {
	const URL = process.env.URL || ''
	const currentDate = new Date().toLocaleDateString('en-GB', {
		// Get current date in DD-MM-YYYY format
		timeZone: 'Asia/Bangkok',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	})
	const commentText = 'Testing appointment booking using page objects'

	test.beforeEach(async ({ page, indexPage, loginPage }) => {
		await page.goto(URL)
		await indexPage.clickMakeAppointment()
		await loginPage.inputLoginForm(
			users.validUser.username,
			users.validUser.password
		)
		await page.waitForLoadState('networkidle', { timeout: 10000 })
	})

	test('Make appointment using page objects @happy', async ({
		page,
		appointmentPage,
		confirmationPage,
	}) => {
		await appointmentPage.inputAppointmentForm({
			facility: facilities.hongkong,
			hospitalReadmission: true,
			program: programs.medicaid,
			visitDate: currentDate,
			comment: commentText,
		})
		await page.waitForLoadState('networkidle', { timeout: 10000 })

		// verify booking succeeded
		await expect(confirmationPage.getHeading).toBeVisible()
		await expect(confirmationPage.getFacility).toHaveText(facilities.hongkong)
		await expect(confirmationPage.getReadmission).toHaveText(readmission.true)
		await expect(confirmationPage.getProgram).toHaveText(programs.medicaid)
		await expect(confirmationPage.getVisitDate).toHaveText(currentDate)
		await expect(confirmationPage.getComment).toHaveText(commentText)
	})
})
