import { type Page, type Locator } from '@playwright/test'

export class IndexPage {
	// Private Page Locators
	private readonly page: Page
	private readonly makeAppointmentLnk: Locator

	constructor(page: Page) {
		this.page = page
		this.makeAppointmentLnk = page.getByRole('link', {
			name: 'Make Appointment',
		})
	}

	// Public Methods
	public async clickMakeAppointment(): Promise<void> {
		await this.makeAppointmentLnk.click()
	}
}
