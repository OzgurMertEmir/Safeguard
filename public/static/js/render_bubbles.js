// export async function generateBubbleText1(values, state) {
//     let min = Number.MAX_SAFE_INTEGER;
//     let hour = 0;
//     for(let i = 0; i < values.length; i++) {
//         if(values[i] < min) {
//             hour = i;
//             min = values[i];
//         }
//     }
//
//     let suffix = "AM";
//     if(hour > 11) suffix = "PM";
//
//     const bubbleText = `The safest hour to drive in ${state} is ${hour}${suffix}`;
//     return bubbleText;
// }
//
// et bubbleDiv1 = null;
//
// async function fetchAndRenderTrend1Chart(state) {
//     const response = await fetch(/severityToTimeIntervals/${state});
//     const data = await response.json();
//     const labels = [];
//     const values = [];
//
//     let idx = 0;
//     const data_points = data.forEach(d => {
//         labels[idx] = d[0];
//         values[idx] = d[1];
//         idx++;
//     });
//
//
//     bubbleDiv1 = document.getElementById("bubble1");
//     var textNode = document.createTextNode(await generateBubbleText1(values, state));
//     bubbleDiv1.append(textNode);
//     // bubbleDiv1.textContent = await generateBubbleText1(values, state);