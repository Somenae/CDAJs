// Fonction qui affiche les éléments d'un tableau passés en paramètre, puis sa longueur
function displayArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
    console.log("Longueur du tableau : " + array.length);
}

// Fonction qui détecte si un élément est présent dans un tableau
function isElementInArray(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) return true;
    }
    return false;
}

// Fonction qui compte le nombre d'occurences d'un élément dans un tableau
function countOccurences(array, element) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            count++;
        }
    }
    return count;
}

// Fonction qui calcule la moyenne de plusieurs eleves pour une meme matière
// Attention : le tableau passé en paramètre doit être à double entrée
// Exemple : [[11, 12], [13, 18], [05, 12]]  : il y a trois eleves avec une seule matière
function calculateAverage(array) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            sum += array[i][j];
            count++;
        }
    }
    return sum / count;
}

// Fonction qui trie un tableau par ordre croissant
// Si l'exercice est terminé, chercher un moyen de trier le tableau de la manière la plus optimale (complexité), se renseigner sur les algorithmes de tri
function sortArray(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}
