import { test, expect } from '@playwright/test'
import users from '../test-data/users/users.json'

test.describe('EX01-arrange-act-assert.spec.ts', async () => {
	test.beforeEach(async ({ page }) => {
		// Arrange Step: Navigate to the login page
		await page.goto('https://katalon-demo-cura.herokuapp.com/')

		// Act Step: Click on the "Make Appointment" link to go to the login page
		await page.getByRole('link', { name: 'Make Appointment' }).click()
	})

	test('Login passed with valid user @happy', async ({ page }) => {
		// Arrange Step: Fill in the username and password fields with valid credentials
		await page.getByLabel('Username').fill(users.validUser.username)
		await page.getByLabel('Password').fill(users.validUser.password)

		// Act Step: Click the "Login" button
		await page.getByRole('button', { name: 'Login' }).click()

		// Assert Step: Verify that the user is successfully logged in by checking for a specific element on the landing page
		await expect(
			page.getByRole('heading', { name: 'Make Appointment' })
		).toBeVisible()
	})

	test('Login failed with invalid password @negative', async ({ page }) => {
		// Arrange Step: Fill in the username and password fields with invalid credentials
		await page.getByLabel('Username').fill(users.validUser.username)
		await page.getByLabel('Password').fill(users.invalidUser.password)

		// Act Step: Click the "Login" button
		await page.getByRole('button', { name: 'Login' }).click()

		// Assert Step: Verify that an error message is displayed indicating that the login attempt was unsuccessful
		await expect(
			page.getByText(
				'Login failed! Please ensure the username and password are valid.'
			)
		).toBeVisible()
	})

	test('Login failed with invalid username @negative', async ({ page }) => {
		// Arrange Step: Fill in the username and password fields with invalid credentials
		await page.getByLabel('Username').fill(users.invalidUser.username)
		await page.getByLabel('Password').fill(users.validUser.password)

		// Act Step: Click the "Login" button
		await page.getByRole('button', { name: 'Login' }).click()

		// Assert Step: Verify that an error message is displayed indicating that the login attempt was unsuccessful
		await expect(
			page.getByText(
				'Login failed! Please ensure the username and password are valid.'
			)
		).toBeVisible()
	})
})
