# Random Joke Generator

A fun application that fetches random jokes from an external API (JokeAPI). Includes both Node.js and web browser implementations.

## Features

- 🎭 Fetches random jokes from [JokeAPI](https://jokeapi.dev/)
- 🛡️ Safe mode option to filter offensive content
- 📝 Multiple joke formats: one-liners and setup/delivery jokes
- 🌐 Web-based interface with beautiful UI
- 🖥️ Node.js CLI version for programmatic use
- ⚡ No authentication required - uses free public API

## Files

### `joke-generator.js`
Node.js/CLI implementation of the joke generator.

**Usage:**
```bash
node joke-generator.js
```

**Programmatic Usage:**
```javascript
const { getRandomJoke, formatJoke } = require('./joke-generator.js');

// Fetch a safe joke
const joke = await getRandomJoke({ safe: true });
console.log(formatJoke(joke));

// Fetch a specific type
const oneLiner = await getRandomJoke({ 
  safe: true, 
  type: 'single' 
});
```

**Options:**
- `safe` (boolean): Filter offensive jokes (default: true)
- `type` (string): 'single', 'twopart', or 'any' (default: 'any')

### `joke-generator.html`
Interactive web interface for the joke generator.

**Features:**
- Click "Get Joke" button to fetch a random joke
- Toggle safe mode on/off
- Select joke type (any, one-liner, or setup/delivery)
- Beautiful gradient UI with responsive design
- Real-time loading states
- Error handling with user-friendly messages

**Usage:**
1. Open `joke-generator.html` in a web browser
2. Adjust options as desired (safe mode, joke type)
3. Click "Get Joke" button
4. Enjoy the laugh! 😄

## API Details

**Endpoint:** `https://v2.jokeapi.dev/joke/Any`

**Response Format:**
```json
{
  "error": false,
  "category": "General",
  "type": "single",
  "joke": "Why don't scientists trust atoms? Because they make up everything!"
}
```

Or for two-part jokes:
```json
{
  "error": false,
  "category": "Programming",
  "type": "twopart",
  "setup": "Why do Java developers wear glasses?",
  "delivery": "Because they don't C#!"
}
```

**Query Parameters:**
- `safe-mode=true` - Excludes jokes with offensive language
- `type=single` or `type=twopart` - Filter by joke type

## Installation

No installation required! Both versions work out of the box.

### Browser Version
Simply open `joke-generator.html` in any modern web browser.

### Node.js Version
Requires Node.js (any recent version):
```bash
node joke-generator.js
```

## Examples

### Get a random safe joke
```javascript
const joke = await getRandomJoke({ safe: true });
```

### Get a one-liner joke
```javascript
const joke = await getRandomJoke({ 
  safe: true, 
  type: 'single' 
});
```

### Get a setup/delivery joke
```javascript
const joke = await getRandomJoke({ 
  safe: true, 
  type: 'twopart' 
});
```

## Error Handling

Both implementations include robust error handling:
- Network errors are caught and reported
- API errors are displayed to the user
- Invalid responses are handled gracefully

## Browser Compatibility

The web interface works in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- **Load Time:** ~100-300ms (depends on network)
- **Cache:** JokeAPI may cache results
- **Rate Limiting:** No rate limiting for free tier, but be respectful

## Future Enhancements

- [ ] Add joke history/favorites
- [ ] Implement client-side caching
- [ ] Add sharing functionality
- [ ] Support multiple joke categories
- [ ] Add dark mode
- [ ] Export jokes as text/PDF

## License

This project uses the free JokeAPI by Sv443. For terms and conditions, visit [jokeapi.dev](https://jokeapi.dev/).

## Credits

- **API:** [JokeAPI](https://jokeapi.dev/) by Sv443
- **Implementation:** ServiceScopeHQ Platform
