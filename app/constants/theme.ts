export const THEME_COLORS = [
	{
		id: 'default',
		label: 'Porphyra',
		description: 'Imperial violet gradient',
		preview: '#6366f1',
	},
	{
		id: 'red',
		label: 'Erythros',
		description: 'Martial crimson blaze',
		preview: '#ef4444',
	},
	{
		id: 'rose',
		label: 'Rhodon',
		description: 'Blooming rose radiance',
		preview: '#f43f5e',
	},
	{
		id: 'orange',
		label: 'Pyrros',
		description: 'Fiery sunlit ember',
		preview: '#fb923c',
	},
	{
		id: 'green',
		label: 'Chloros',
		description: 'Verdant harvest calm',
		preview: '#22c55e',
	},
	{
		id: 'blue',
		label: 'Kyanos',
		description: 'Aegean depth current',
		preview: '#3b82f6',
	},
	{
		id: 'yellow',
		label: 'Xanthos',
		description: 'Golden dawn spark',
		preview: '#facc15',
	},
	{
		id: 'violet',
		label: 'Ianthe',
		description: 'Twilight orchid glow',
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
