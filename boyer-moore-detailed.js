// Boyer Moore Algorithm Implementation for Assignment 2 CPT212

const inputText = "AABAAABCEDBABCDDEBC".toLowerCase();
const pattern = "ABC".toLowerCase();

search(inputText, pattern);

// Driver function
function search(input, pattern) {
	// Array to store all matching positions
	const matches = [];

	for (let pos = 0; pos < input.length; pos++) {
		console.log(`Current: ${input.substr(pos)}\nPattern: ${pattern}`);
		
		// Break if the remaining string is shorter than the pattern
		if (input.substr(pos).length < pattern.length) {
			console.log('=================================================================');
			console.log(`Remaining length shorter than pattern.`);
			console.log('=================================================================\n');	
			break;
		}

		// Check for any mismatchs at the current position
		const mmPos = findMismatch(input.substr(pos, pattern.length), pattern);

		// No mismatch? skip the current iteration and skip size
		if (mmPos === -1) {
			matches.push(pos);
			pos += pattern.length - 2;
			console.log('=================================================================');
			console.log(`Match! Skipping pattern length`);
			console.log('=================================================================\n');
			continue;
		}

		// Need to init goodPos outside so that we can access it from here later
		let goodPos = -1;

		// If there is a mismatch at the last character,
		// then there is no need to run the good suffix rule
		if (mmPos+1 !== pattern.length) {
			goodPos = goodSuffix(pattern, mmPos, pattern.substr(mmPos+1));
		}

		// Run the bad character rule
		const badPos = badCharacter(pattern, mmPos, input.charAt(pos+mmPos));

		// Check the end of each loop if there is a mismatch
		console.log(`Mismatch at position: ${mmPos}\nBad Character Rule: ${badPos}\nGood Suffix Rule: ${goodPos}`);
		
		// We skip these number of characters according to the rule
		pos += Math.max(0, badPos-2, goodPos-2);
		console.log('=================================================================');
		console.log(`Moved by: ${Math.max(0, badPos-2, goodPos-2)}`);
		console.log('=================================================================\n');
	}	

	// Print out all the matches that were found
	printMatches(matches);
}


function findMismatch(input, pattern) {
	// Match characters from right to left
	for (let i = pattern.length - 1; i >= 0; i--) {
		// If a mismatch occurs, return the position of the mismatch
		if (input.charAt(i) !== pattern.charAt(i)) {
			return i;
		}
	}

	// Nothing has been matched, return -1
	return -1;
}

function badCharacter(pattern, mismatchPos, searchChar) {
	// We iterate backwards from the position of the mismatch
	// until we find the a matching character or 0
	for (let i = mismatchPos-1; i >= 0; i--) {
		// If this is a matching char, we return the position
		if(pattern.charAt(i) === searchChar) {
			return pattern.length - i;
		};
	}

	// Nothing matched, we return the mismatch position itself
	return mismatchPos;
}

function goodSuffix(input, mismatchPos, searchSuffix) {
	// Iterate backwards till we find the next match for the suffix
	for (let i = mismatchPos-searchSuffix.length+1; i >= 0; i--) {
		// If there is a match, we return the position
		if(input.substr(i, searchSuffix.length) === searchSuffix) {
			return input.length - i;
		}
	}

	// Otherwise, we return -1
	return -1;
}

function printMatches(matches) {
	// If there were no matches, return a message saying that
	if(matches.length === 0) {
		console.log('No matches found');
		return;
	}
	
	// Otherwise, iterate through and create a message
	let matchString = `Matches found at ${matches.length === 1 ? 'index' : 'indices'}: `;
	for (let i = 0; i < matches.length; i++) {
		matchString += `${matches[i]}`;
		
		if(i !== matches.length-1) {
			matchString += ', '; 
		}
	}

	matchString += '.';

	console.log(matchString);
}
