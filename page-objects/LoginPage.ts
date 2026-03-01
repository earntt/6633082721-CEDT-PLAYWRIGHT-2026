import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
	// Private Page Locators
	private readonly page: Page
	private readonly usernameTxt: Locator
	private readonly passwordTxt: Locator
	private readonly loginBtn: Locator
	private readonly alertMsg: Locator

	constructor(page: Page) {
		this.page = page
		this.usernameTxt = page.locator('#txt-username')
		this.passwordTxt = page.locator('#txt-password')
		this.loginBtn = page.locator('#btn-login')
		this.alertMsg = page.locator('.lead.text-danger')
	}

	public async inputLoginForm(
		username: string,
		password: string
	): Promise<void> {
		await this.usernameTxt.fill(username)
		await this.passwordTxt.fill(password)
		await this.loginBtn.click()
	}

	// Getters for private locators
	get alertTxt(): Locator {
		return this.alertMsg
	}
}
