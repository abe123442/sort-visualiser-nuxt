import { ThemeManager } from './theme'

export interface IApp {
    name: string
    author: {
        name: string
    }
}

export function AppSetup() {
    // declare app information - IApp is an app information type
    const app: IApp = {
        name: 'simulsort',
        author: {
            name: 'abraham'
        },
    }
    useState('app', () => app)

    // use theme manager
    const themeManager = ThemeManager()


    return {
        app,
        themeManager,
    }
}
