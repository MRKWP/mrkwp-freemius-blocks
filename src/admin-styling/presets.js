/**
 * Freemius Blocks Styling Presets and Defaults
 */

export const DEFAULT_STYLES = {
	bg: '#ffffff',
	text: '#111827',
	textMuted: '#6b7280',
	accent: '#ffb703',
	accentText: '#111827',
	featureHighlight: '#2563eb',
	border: '#e5e7eb',
	toggleBg: '#f1f5f9',
	toggleActiveBg: '#ffffff',
	toggleActiveText: '#111827',
	btnBg: '#111827',
	btnColor: '#ffffff',
	btnHoverBg: '#1f2937',
	cardShadow:
		'0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
	cardShadowHover:
		'0 20px 30px -10px rgba(0, 0, 0, 0.08), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
	highlightShadow:
		'0 20px 35px -5px rgba(255, 183, 3, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
	cardRadius: '24px',
	btnRadius: '9999px',
};

export const SHADOW_OPTIONS = [
	{
		label: 'Subtle Soft (Default)',
		value: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
	},
	{
		label: 'Elevated & Crisp',
		value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
	},
	{
		label: 'Deep Float',
		value: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
	},
	{
		label: 'Minimal / Subtle Outline',
		value: '0 1px 3px rgba(0, 0, 0, 0.05)',
	},
	{
		label: 'None (Flat)',
		value: 'none',
	},
];

export const PRESETS = [
	{
		id: 'warm-gold',
		name: 'Warm Gold (Default)',
		description:
			'The standard high-converting Freemius design with golden highlight badge and clean white cards.',
		styles: {
			...DEFAULT_STYLES,
		},
	},
	{
		id: 'modern-indigo',
		name: 'Modern Indigo (SaaS)',
		description:
			'Tech-focused vibrant blue-violet styling with elevated cards and sleek dark-indigo buttons.',
		styles: {
			bg: '#ffffff',
			text: '#0f172a',
			textMuted: '#64748b',
			accent: '#6366f1',
			accentText: '#ffffff',
			featureHighlight: '#4f46e5',
			border: '#e2e8f0',
			toggleBg: '#ede9fe',
			toggleActiveBg: '#6366f1',
			toggleActiveText: '#ffffff',
			btnBg: '#4f46e5',
			btnColor: '#ffffff',
			btnHoverBg: '#4338ca',
			cardShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.08)',
			cardShadowHover: '0 20px 30px -10px rgba(99, 102, 241, 0.15)',
			highlightShadow: '0 20px 35px -5px rgba(99, 102, 241, 0.25)',
			cardRadius: '20px',
			btnRadius: '10px',
		},
	},
	{
		id: 'midnight-dark',
		name: 'Midnight Dark',
		description:
			'Sleek dark mode theme with deep slate cards, crisp borders, and electric cyan accents.',
		styles: {
			bg: '#1e293b',
			text: '#f8fafc',
			textMuted: '#94a3b8',
			accent: '#38bdf8',
			accentText: '#0f172a',
			featureHighlight: '#0ea5e9',
			border: '#334155',
			toggleBg: '#0f172a',
			toggleActiveBg: '#38bdf8',
			toggleActiveText: '#0f172a',
			btnBg: '#38bdf8',
			btnColor: '#0f172a',
			btnHoverBg: '#7dd3fc',
			cardShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
			cardShadowHover: '0 20px 30px -10px rgba(0, 0, 0, 0.6)',
			highlightShadow: '0 20px 35px -5px rgba(56, 189, 248, 0.2)',
			cardRadius: '20px',
			btnRadius: '9999px',
		},
	},
	{
		id: 'emerald-growth',
		name: 'Emerald Growth',
		description:
			'Trustworthy financial and productivity aesthetic with lush emerald and forest green accents.',
		styles: {
			bg: '#ffffff',
			text: '#064e3b',
			textMuted: '#047857',
			accent: '#10b981',
			accentText: '#ffffff',
			featureHighlight: '#059669',
			border: '#d1fae5',
			toggleBg: '#ecfdf5',
			toggleActiveBg: '#10b981',
			toggleActiveText: '#ffffff',
			btnBg: '#065f46',
			btnColor: '#ffffff',
			btnHoverBg: '#047857',
			cardShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.08)',
			cardShadowHover: '0 20px 30px -10px rgba(16, 185, 129, 0.15)',
			highlightShadow: '0 20px 35px -5px rgba(16, 185, 129, 0.25)',
			cardRadius: '24px',
			btnRadius: '12px',
		},
	},
	{
		id: 'minimal-slate',
		name: 'Minimal Slate',
		description:
			'Understated monochrome typography, ultra-clean borders, and crisp high-contrast black buttons.',
		styles: {
			bg: '#ffffff',
			text: '#000000',
			textMuted: '#52525b',
			accent: '#000000',
			accentText: '#ffffff',
			featureHighlight: '#18181b',
			border: '#e4e4e7',
			toggleBg: '#f4f4f5',
			toggleActiveBg: '#18181b',
			toggleActiveText: '#ffffff',
			btnBg: '#000000',
			btnColor: '#ffffff',
			btnHoverBg: '#27272a',
			cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
			cardShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
			highlightShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12)',
			cardRadius: '12px',
			btnRadius: '6px',
		},
	},
];
