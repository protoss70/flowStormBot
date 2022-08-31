export const scrollTo = (element, to, duration) => {
    let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

    const easeInOutQuad = (currentTime, startValue, changeInValue, duration) => {
        currentTime /= duration/2;
        if (currentTime < 1) {
            return changeInValue / 2 * currentTime * currentTime + startValue;
        }
        currentTime--;
        return -changeInValue / 2 * ( currentTime * ( currentTime - 2 ) - 1 ) + startValue;
    };

    const animateScroll = () => {
        currentTime += increment;
        element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    }
    animateScroll();
}
