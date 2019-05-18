import { AppUI } from '../UI/AppUI';

export class App {
    UI!: AppUI;

    Start() {
        this.UI = new AppUI();
        this.UI.Start();
        this.UI.Show();
    }
}