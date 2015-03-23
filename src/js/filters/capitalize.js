angular.module('Commutable')
    .filter('capitalize', function () {
    return function (input, format) {
        if (!input) {
            return input;
        }
        format = format || 'all';
        if (format === 'first') {
            // Capitalize the first letter of a sentence
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        } else {
            var words = input.split(' ');
            var result = [];
            words.forEach(function (word) {
                if (word.length === 2 && format === 'nottwo' && word.toLowerCase() !== 'of' && word.toLowerCase() !== 'st') {
                    // Uppercase team abbreviations like FC, CD, SD except of and st
                    result.push(word.toUpperCase());
                } else {
                    result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                }
            });
            return result.join(' ');
        }
    };
});