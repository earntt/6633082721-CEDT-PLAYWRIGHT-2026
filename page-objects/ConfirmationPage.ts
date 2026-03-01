import { type Page, type Locator } from '@playwright/test'

export class ConfirmationPage {
	private readonly page: Page
	private readonly heading: Locator
	private readonly facility: Locator
	private readonly readmission: Locator
	private readonly program: Locator
	private readonly visitDate: Locator
	private readonly comment: Locator

	constructor(page: Page) {
		this.page = page
		this.heading = page.getByRole('heading', {
			name: 'Appointment Confirmation',
		})
		this.facility = page.locator('#facility')
		this.readmission = page.locator('#hospital_readmission')
		this.program = page.locator('#program')
		this.visitDate = page.locator('#visit_date')
		this.comment = page.locator('#comment')
	}

	get getHeading(): Locator {
		return this.heading
	}

	get getFacility(): Locator {
		return this.facility
	}

	get getReadmission(): Locator {
		return this.readmission
	}

	get getProgram(): Locator {
		return this.program
	}

	get getVisitDate(): Locator {
		return this.visitDate
	}

	get getComment(): Locator {
		return this.comment
	}
}
