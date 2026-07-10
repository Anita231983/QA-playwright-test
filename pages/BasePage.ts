import {Page} from '@playwright/test';

export default abstract class BasePage{
  protected readonly page: Page;

  constructor(page: Page){
    this.page = page;
  }

  async navigateToChairlyo(url:string){
    await this.page.goto(url);
  }
}


