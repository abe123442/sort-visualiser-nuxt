import { ThemeManager } from './theme'
import { LanguageManager } from './lang'

export interface IApp {
    name: string
    author: {
        name: string
    }
}

export function AppSetup() {
    // declare app information
    const app: IApp = {
        name: 'simulsort',
        author: {
            name: 'abraham'
        },
    }
    useState('app', () => app)

    // use theme manager
    const themeManager = ThemeManager()

    // use language manager
    const languageManager = LanguageManager()

    return {
        app,
        themeManager,
        languageManager,
    }
}
