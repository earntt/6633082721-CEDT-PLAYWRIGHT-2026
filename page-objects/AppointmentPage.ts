import { type Page, type Locator } from '@playwright/test'

export class AppointmentPage {
	private readonly page: Page
	private readonly facilitySelect: Locator
	private readonly readmissionCheckbox: Locator
	private readonly programRadios: Locator
	private readonly visitDateInput: Locator
	private readonly commentInput: Locator
	private readonly bookButton: Locator

	constructor(page: Page) {
		this.page = page
		this.facilitySelect = page.getByRole('combobox', { name: 'Facility' })
		this.readmissionCheckbox = page.getByRole('checkbox', {
			name: 'Apply for hospital readmission',
		})
		this.programRadios = page.locator('input[type="radio"]')
		this.visitDateInput = page.getByRole('textbox', {
			name: 'Visit Date (Required)',
		})
		this.commentInput = page.getByRole('textbox', { name: 'Comment' })
		this.bookButton = page.getByRole('button', { name: 'Book Appointment' })
	}

	public async inputAppointmentForm({
		facility,
		hospitalReadmission,
		program,
		visitDate,
		comment,
	}: {
		facility: string
		hospitalReadmission: boolean
		program: string
		visitDate: string
		comment: string
	}): Promise<void> {
		await this.facilitySelect.selectOption(facility)

		if (hospitalReadmission) {
			await this.readmissionCheckbox.check()
		}

		const radios = await this.programRadios.all()
		for (const radio of radios) {
			if ((await radio.getAttribute('value')) === program) {
				await radio.check()
				break
			}
		}

		await this.visitDateInput.fill(visitDate)
		await this.visitDateInput.press('Enter') // Some browsers may require 'enter' key to trigger validation
		await this.commentInput.fill(comment)
		await this.bookButton.click()
	}
}
