export const ACCENT_THEMES = [
	{
		id: 'default',
		label: 'Default',
		description: 'Iris x cobalt gradient',
		preview: '#6366f1',
	},
	{
		id: 'red',
		label: 'Red',
		description: 'Signal red energy',
		preview: '#ef4444',
	},
	{
		id: 'rose',
		label: 'Rose',
		description: 'Rosy magenta glow',
		preview: '#f43f5e',
	},
	{
		id: 'orange',
		label: 'Orange',
		description: 'Amber sunrise',
		preview: '#fb923c',
	},
	{
		id: 'green',
		label: 'Green',
		description: 'Emerald automation',
		preview: '#22c55e',
	},
	{
		id: 'blue',
		label: 'Blue',
		description: 'Azure workflow',
		preview: '#3b82f6',
	},
	{
		id: 'yellow',
		label: 'Yellow',
		description: 'Solar spark',
		preview: '#facc15',
	},
	{
		id: 'violet',
		label: 'Violet',
		description: 'Violet pulse',
		preview: '#a855f7',
	},
] as const

export type AccentTheme = typeof ACCENT_THEMES[number]['id']

const ACCENT_THEME_SET = new Set<AccentTheme>(ACCENT_THEMES.map((theme) => theme.id))

export const isAccentTheme = (value: string | null | undefined): value is AccentTheme => {
	if (!value) return false
	return ACCENT_THEME_SET.has(value as AccentTheme)
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
