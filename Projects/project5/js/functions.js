// Function to extract text within parentheses
function extractTextWithinParentheses(inputString) {
    // Use a regular expression to match text within parentheses
    const matches = inputString.match(/\(([^)]+)\)/);
    
    // Check if there is a match
    if (matches && matches.length > 1) {
      // Return the text within parentheses (group 1 of the match)
      return matches[1];
    }
    
    // If no match is found, return an empty string or any default value you prefer
    return "";
  }
  
function formatNumber(number) {
    // Round the number to two decimal places and convert it to a string
    let formattedNumber = number.toFixed(2);
  
    // Convert the string back to a number to remove leading zeros
    return parseFloat(formattedNumber);
  }
  
export { extractTextWithinParentheses, formatNumber };