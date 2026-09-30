import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Avatar from './avatar.tsx'

describe('Avatar', () => {
    it('shows the initials of a single name split on spaces', () => {
        render(<Avatar names={['Ada Lovelace']} />)

        expect(screen.getByText('AL')).toBeInTheDocument()
    })

    it('shows one initial per name, up to two, for multiple names', () => {
        render(<Avatar names={['Ada', 'Grace', 'Katherine']} />)

        expect(screen.getByText('AG+')).toBeInTheDocument()
    })

    it('picks the same color for the same names every time (no Math.random flicker)', () => {
        const { container: first } = render(<Avatar names={['Ada Lovelace']} />)
        const { container: second } = render(<Avatar names={['Ada Lovelace']} />)

        const firstClasses = first.firstChild as HTMLElement
        const secondClasses = second.firstChild as HTMLElement

        expect(firstClasses.className).toBe(secondClasses.className)
    })
})
