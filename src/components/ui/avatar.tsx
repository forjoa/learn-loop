const Avatar = ({ names }: { names: string[] }) => {
    const colors = [
        'bg-red',
        'bg-blue',
        'bg-green-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-teal-500',
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const letters =
        names.length > 1
            ? names.map(name => name[0]?.toUpperCase() || '')
            : names[0]?.split(' ').map(word => word[0]?.toUpperCase() || '') || []

    const displayedLetters =
        letters.length > 2 ? `${letters.slice(0, 2).join('')}+` : letters.join('')

    return (
        <div
            className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold ${randomColor}`}
        >
            {displayedLetters}
        </div>
    )
}

export default Avatar
