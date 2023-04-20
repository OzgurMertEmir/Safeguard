
    const bubbleText = `The safest hour to drive in ${state} is ${hour}${suffix}`;
    return bubbleText;
}

export async function renderBubble1() {
    const response = await fetch(`/severityToTimeIntervals/FL`);
    const data = await response.json();

    console.log(data);
    const values = [];

    let idx = 0;
    const data_points = data.forEach(d => {
      values[idx] = d[1];
      idx++;
    });

    const bubbleText = await generateBubbleText1(values, "FL");
    const bubbleDiv1 = document.getElementById("bubble1");
    bubbleDiv1.innerHTML = bubbleText;
  }