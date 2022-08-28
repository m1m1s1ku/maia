interface ElaraAnimation {
    effect: PropertyIndexedKeyframes;
    options: KeyframeAnimationOptions;
}

export function pulseWith(duration: number): ElaraAnimation {
    return {
        effect: {
            opacity: [.5, 1],
            transform: ['scale(.95)', 'scale(1)'],
        },
        options: {
            duration
        }
    };
}

export function fadeWith(duration: number, enter: boolean): ElaraAnimation {
    return {
        effect: {
            opacity: enter ? [0, 1] : [1, 0]
        },
        options: {
            duration
        }
    };
}

export default {
    pulseWith,
    fadeWith
};