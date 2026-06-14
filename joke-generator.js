/**
 * Joke Generator - Fetches random jokes from an external API
 * Uses JokeAPI (https://jokeapi.dev/)
 */

const JOKE_API_URL = 'https://v2.jokeapi.dev/joke/Any';

/**
 * Fetch a random joke from the API
 * @param {Object} options - Configuration options
 * @param {boolean} options.safe - If true, excludes jokes with offensive language
 * @param {string} options.type - 'single' for one-liner, 'twopart' for setup/delivery, or 'any'
 * @returns {Promise<Object>} Joke object with joke content
 */
async function getRandomJoke(options = {}) {
  try {
    const { safe = true, type = 'any' } = options;
    
    // Build query parameters
    let url = JOKE_API_URL;
    const params = new URLSearchParams();
    
    if (safe) {
      params.append('safe-mode', 'true');
    }
    
    if (type && type !== 'any') {
      params.append('type', type);
    }
    
    if (params.toString()) {
      url += '?' + params.toString();
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const joke = await response.json();
    
    if (joke.error) {
      throw new Error(`API Error: ${joke.message}`);
    }
    
    return joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
}

/**
 * Format a joke object into readable text
 * @param {Object} joke - Joke object from the API
 * @returns {string} Formatted joke text
 */
function formatJoke(joke) {
  if (joke.type === 'single') {
    return joke.joke;
  } else if (joke.type === 'twopart') {
    return `${joke.setup}\n\n${joke.delivery}`;
  }
  return 'Unable to format joke';
}

/**
 * Get and display a random joke (for Node.js/CLI usage)
 */
async function main() {
  try {
    console.log('🎭 Fetching a random joke...\n');
    
    const joke = await getRandomJoke({ safe: true });
    const formattedJoke = formatJoke(joke);
    
    console.log(formattedJoke);
    console.log('\n✨ Joke fetched successfully!');
  } catch (error) {
    console.error('❌ Failed to get joke:', error.message);
    process.exit(1);
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getRandomJoke, formatJoke };
}

// Run if executed directly
if (require.main === module) {
  main();
}
