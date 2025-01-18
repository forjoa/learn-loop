import { motion, useCycle } from 'framer-motion'

const loadingContainer = {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'space-around',
}
const loadingCircle = {
    display: 'block',
    width: '1rem',
    height: '1rem',
    backgroundColor: '#016BFF',
    borderRadius: '0.5rem',
}

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2,
        },
    },
    end: {
        transition: {
            staggerChildren: 0.2,
        },
    },
}

const loadingCircleVariants = {
    start: {
        y: '0%',
    },
    end: {
        y: '60%',
    },
}
const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut',
}

const Loader = () => {
    const [ animationCycle, toggleCycle ] = useCycle('start', 'end')

    return (
        <div>
            <div className="fixed w-full min-h-screen bg-black top-0 opacity-50 z-40"/>
            <div className="flex fixed w-full justify-center items-center h-screen z-50 top-0">
                <motion.div
                    style={loadingContainer}
                    variants={loadingContainerVariants}
                    animate={animationCycle}
                    onAnimationComplete={() => toggleCycle()}
                >
                    <motion.span
                        style={loadingCircle}
                        variants={loadingCircleVariants}
                        transition={loadingCircleTransition}
                    ></motion.span>
                    <motion.span
                        style={loadingCircle}
                        variants={loadingCircleVariants}
                        transition={loadingCircleTransition}
                    ></motion.span>
                    <motion.span
                        style={loadingCircle}
                        variants={loadingCircleVariants}
                        transition={loadingCircleTransition}
                    ></motion.span>
                </motion.div>
            </div>
        </div>
    )
}

export default Loader
