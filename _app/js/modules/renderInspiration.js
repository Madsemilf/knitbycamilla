import { sanity } from '../sanity.js'

export default async function RenderInspirationPage() {
	const inspirationContainer = document.getElementById('inspiration');
  const query = `*[_type == 'pattern'] {
    Image {
      ..., asset ->
    }
  }`;

  const patterns = await sanity.fetch(query);

  const sentences = [
    'Create something great',
    'We knit, We share',
    'Knitting world',
    'Happy happy',
    'Something for everyone',
    'Checkout what we love',
    'Can you knit?',
    'Everything is cosy with knit',
    'Stay warm!',
    'New oslo knits',
  ];

  function createInspirationPageDOM(pattern) {
    const inspirationItem = document.createElement('div');
    inspirationItem.classList.add('inspiration-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('inspiration-image-container');

    const image = document.createElement('img');
    image.classList.add('inspiration-image');
    image.src = pattern.Image.asset.url;
    image.alt = '';

    const textContainer = document.createElement('div');
    textContainer.classList.add('inspiration-text-container');

    const text = document.createElement('div');
    text.classList.add('inspiration-text');
    text.textContent = getRandomSentence();

    // Append elements in the desired order
    imageContainer.appendChild(image);
    textContainer.appendChild(text);
    inspirationItem.appendChild(imageContainer);
    inspirationItem.appendChild(textContainer);

    return inspirationItem;
  }

  function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
  }

  function renderInspirationHTML(inspirationContainer) {
    let imageCount = 0;

    for (let i = 0; i < patterns.length; i++) {
      const pattern = patterns[i];

      const inspirationItem = createInspirationPageDOM(pattern);

      if (imageCount % 2 === 0) {
        inspirationContainer.appendChild(inspirationItem);
      } else {
        const prevInspirationItem = inspirationContainer.lastElementChild;
        inspirationContainer.insertBefore(inspirationItem, prevInspirationItem);
      }

      imageCount++;

      if (imageCount >= 10) {
        break;
      }
    }
  }

  renderInspirationHTML(inspirationContainer);
}