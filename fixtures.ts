import { IndexPage } from './page-objects/IndexPage'
import { LoginPage } from './page-objects/LoginPage'
import { AppointmentPage } from './page-objects/AppointmentPage'
import { ConfirmationPage } from './page-objects/ConfirmationPage'
import { test as base } from '@playwright/test'

export const test = base.extend<{
	indexPage: IndexPage
	loginPage: LoginPage
	appointmentPage: AppointmentPage
	confirmationPage: ConfirmationPage
}>({
	indexPage: async ({ page }, use) => {
		const indexPage = new IndexPage(page)
		await use(indexPage)
	},
	loginPage: async ({ page }, use) => {
		const loginPage = new LoginPage(page)
		await use(loginPage)
	},
	appointmentPage: async ({ page }, use) => {
		const appointmentPage = new AppointmentPage(page)
		await use(appointmentPage)
	},
	confirmationPage: async ({ page }, use) => {
		const confirmationPage = new ConfirmationPage(page)
		await use(confirmationPage)
	},
})

export { expect } from '@playwright/test'
