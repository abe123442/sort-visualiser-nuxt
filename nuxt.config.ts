import { defineNuxtConfig } from 'nuxt'
import { IntlifyModuleOptions } from '@intlify/nuxt3'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// declare module '@nuxt/schema' {
// 	interface NuxtConfig {
// 		intlify?: IntlifyModuleOptions
// 	}
// }

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
	// app
	app: {
		head: {
			title: 'simulsort',
			titleTemplate: '%s',
			meta: [
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'description',
					name: 'description',
					content: 'simulsort',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/bar-chart-icon.png' }],
		},
	},

	// css
	css: [
		'virtual:windi-base.css',
		'virtual:windi-components.css',
		'virtual:windi-utilities.css',
		'~/assets/sass/vendor.scss',
		'~/assets/sass/app.scss',
	],

	// plugins
	plugins: ['~/plugins/navbar.ts'],

	// build
	build: {
		transpile: ['@headlessui/vue'],
	},

	// build modules
	buildModules: [
		'nuxt-windicss',
		'@nuxtjs/eslint-module',
		'unplugin-icons/nuxt',
		'@pinia/nuxt',
		'@nuxtjs/svg',
		'@intlify/nuxt3',
		'@vueuse/nuxt',
	],

	// experimental features
	experimental: {
		reactivityTransform: true,
	},

	// auto import components
	components: true,

	// vite plugins
	vite: {
		plugins: [
			UnpluginComponentsVite({
				dts: true,
				resolvers: [
					IconsResolver({
						prefix: 'Icon',
					}),
				],
			}),
		],
	},

	// vueuse
	vueuse: {
		ssrHandlers: true,
	},

	// windicss
	windicss: {
		analyze: {
			analysis: {
				interpretUtilities: false,
			},
			server: {
				port: 4000,
				open: false,
			},
		},
		scan: true,
	},
})
