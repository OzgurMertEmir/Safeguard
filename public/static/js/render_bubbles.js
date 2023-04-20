export async function generateBubbleText1(values, state) {
    let min = Number.MAX_SAFE_INTEGER;
    let hour = 0;
    for(let i = 0; i < values.length; i++) {
        if(values[i] < min) {
            hour = i;
            min = values[i];
        }
    }

    let suffix = "AM";
    if(hour > 11) suffix = "PM";

    const bubbleText = `The safest hour to drive in ${state} is ${hour}${suffix}`;
    return bubbleText;
}