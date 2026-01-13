export const THEME_COLORS = [
	{
		id: 'default',
		label: 'Iris',
		description: 'Prismatic cobalt gradient',
		preview: '#6366f1',
	},
	{
		id: 'red',
		label: 'Ares',
		description: 'Warborn scarlet energy',
		preview: '#ef4444',
	},
	{
		id: 'rose',
		label: 'Aphrodite',
		description: 'Rosy magenta allure',
		preview: '#f43f5e',
	},
	{
		id: 'orange',
		label: 'Helios',
		description: 'Solar chariot ember',
		preview: '#fb923c',
	},
	{
		id: 'green',
		label: 'Demeter',
		description: 'Verdant harvest calm',
		preview: '#22c55e',
	},
	{
		id: 'blue',
		label: 'Poseidon',
		description: 'Azure tidal command',
		preview: '#3b82f6',
	},
	{
		id: 'yellow',
		label: 'Apollo',
		description: 'Sunlit golden spark',
		preview: '#facc15',
	},
	{
		id: 'violet',
		label: 'Hecate',
		description: 'Violet midnight aura',
		preview: '#a855f7',
	},
] as const

export type ThemeColor = typeof THEME_COLORS[number]['id']

const THEME_COLOR_SET = new Set<ThemeColor>(THEME_COLORS.map((theme) => theme.id))

export const isThemeColor = (value: string | null | undefined): value is ThemeColor => {
	if (!value) return false
	return THEME_COLOR_SET.has(value as ThemeColor)
}

export const LAYOUT_MODES = [
	{
		id: 'fixed',
		label: 'Fixed',
		description: 'Classic centered container',
	},
	{
		id: 'full',
		label: 'Full',
		description: 'Edge-to-edge storytelling',
	},
] as const

export type LayoutMode = typeof LAYOUT_MODES[number]['id']

const LAYOUT_MODE_SET = new Set<LayoutMode>(LAYOUT_MODES.map((option) => option.id))

export const isLayoutMode = (value: string | null | undefined): value is LayoutMode => {
	if (!value) return false
	return LAYOUT_MODE_SET.has(value as LayoutMode)
}
