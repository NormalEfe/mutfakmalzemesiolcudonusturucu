
// Kategoriler ve malzemeler
const categories = {
    mutfak: {
        name: "Mutfak Malzemeleri",
        items: {
            un: {
                name: "Un",
                rates: {
                    gram: 1,
                    ml: 0.6,
                    yemek_kasigi: 10,
                    tatli_kasigi: 5,
                    cay_kasigi: 3,
                    su_bardagi: 120,
                    cay_bardagi: 80,
                    fincan: 100
                }
            },
            seker: {
                name: "Şeker (Toz)",
                rates: {
                    gram: 1,
                    ml: 0.85,
                    yemek_kasigi: 12,
                    tatli_kasigi: 6,
                    cay_kasigi: 3,
                    su_bardagi: 200,
                    cay_bardagi: 100,
                    fincan: 180
                }
            },
            pirinc: {
                name: "Pirinç",
                rates: {
                    gram: 1,
                    ml: 0.9,
                    yemek_kasigi: 15,
                    tatli_kasigi: 8,
                    cay_kasigi: 4,
                    su_bardagi: 200,
                    cay_bardagi: 100,
                    fincan: 170
                }
            }
        }
    }
};

const unitDisplayNames = {
    gram: "Gram",
    ml: "Mililitre",
    yemek_kasigi: "Yemek Kaşığı",
    tatli_kasigi: "Tatlı Kaşığı",
    cay_kasigi: "Çay Kaşığı",
    su_bardagi: "Su Bardağı",
    cay_bardagi: "Çay Bardağı",
    fincan: "Fincan"
};

// Auth işlemleri
function initAuth() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
        });
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const ingredient = document.getElementById('favorite-ingredient').value;

        // localStorage kullanarak kullanıcıları sakla
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Kullanıcı adı kontrolü
        if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
            alert('Bu kullanıcı adı zaten kayıtlı! Lütfen başka bir kullanıcı adı seçin.');
            return;
        }

        users.push({ username, password, ingredient });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        authTabs[0].click();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            document.getElementById('auth-container').style.display = 'none';
            document.querySelector('.main-container').style.display = 'block';
            document.querySelector('.subtitle').textContent = `Hoş geldin, ${user.username}!`;
        } else {
            alert('Kullanıcı adı veya şifre hatalı!');
        }
    });

    // Eğer kullanıcı zaten giriş yapmışsa
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('auth-container').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        document.querySelector('.subtitle').textContent = `Hoş geldin, ${JSON.parse(currentUser).username}!`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initAuth();
    const categorySelect = document.getElementById('category');
    const ingredientSelect = document.getElementById('ingredient');
    const convertBtn = document.getElementById('convert-btn');

    // Kategorileri yükle
    Object.keys(categories).forEach(categoryId => {
        const option = document.createElement('option');
        option.value = categoryId;
        option.textContent = categories[categoryId].name;
        categorySelect.appendChild(option);
    });

    // İlk kategorinin malzemelerini yükle
    updateIngredients(categorySelect.value);

    // Event listeners
    categorySelect.addEventListener('change', function() {
        updateIngredients(this.value);
    });

    convertBtn.addEventListener('click', convertMeasurements);

    document.getElementById('amount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertMeasurements();
        }
    });

    // Yeni malzeme ekleme fonksiyonları
    const addIngredientBtn = document.getElementById('add-ingredient');
    if (addIngredientBtn) {
        addIngredientBtn.addEventListener('click', addNewIngredient);
    }

    // Var olan malzeme silme butonlarını aktifleştir
    document.querySelectorAll('.remove-ingredient').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.ingredient-row').remove();
        });
    });

    // Tarif kaydetme
    const recipeForm = document.getElementById('recipe-form');
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const recipeName = document.getElementById('recipe-name').value;
        const recipeDescription = document.getElementById('recipe-description').value;
        const ingredients = [];
        
        document.querySelectorAll('.ingredient-row').forEach(row => {
            const name = row.querySelector('.ingredient-name').value;
            const amount = row.querySelector('.ingredient-amount').value;
            const unit = row.querySelector('.ingredient-unit').value;
            
            if (name && amount) {
                ingredients.push({ name, amount, unit });
            }
        });

        if (!recipeName || ingredients.length === 0) {
            alert('Lütfen tarif adını ve en az bir malzeme ekleyin.');
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const recipe = {
            id: Date.now(),
            name: recipeName,
            description: recipeDescription,
            ingredients: ingredients,
            date: new Date().toLocaleDateString(),
            userId: currentUser.username
        };

        // Mevcut tarifleri al
        let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // siteStorage.txt dosyasına kaydet
        const recipeText = `${recipe.userId} - ${recipe.name} - ${recipe.date}\n\n`;
        
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/append-storage', true);
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send(recipeText);

        // Tarif kartını ekle
        addRecipeCard(recipe);

        // Formu temizle
        recipeForm.reset();
        document.querySelectorAll('.ingredient-row').forEach((row, index) => {
            if (index !== 0) row.remove();
        });

        alert('Tarif başarıyla kaydedildi!');
    });

    // Sayfa yüklendiğinde tarifleri göster
    loadRecipes();
});

function addRecipeCard(recipe) {
    const recipesGrid = document.querySelector('.recipes-grid');
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <div class="recipe-header">
            <h3>${recipe.name}</h3>
            <span class="recipe-date">${recipe.date}</span>
        </div>
        ${recipe.description ? `<p class="recipe-description">${recipe.description}</p>` : ''}
        <div class="recipe-ingredients">
            <h4>Malzemeler</h4>
            <ul>
                ${recipe.ingredients.map(ing => `
                    <li><span class="amount">${ing.amount} ${ing.unit}</span> ${ing.name}</li>
                `).join('')}
            </ul>
        </div>
        <div class="recipe-actions">
            <button class="delete-recipe" onclick="deleteRecipe(${recipe.id})">Sil</button>
        </div>
    `;
    recipesGrid.appendChild(card);
}

function loadRecipes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    // Sadece mevcut kullanıcının tariflerini filtrele
    recipes = recipes.filter(recipe => recipe.userId === currentUser.username);
    
    const recipesGrid = document.querySelector('.recipes-grid');
    recipesGrid.innerHTML = recipes.length ? '' : '<p class="no-recipes">Henüz kayıtlı tarif yok.</p>';
    recipes.forEach(recipe => addRecipeCard(recipe));
}

function deleteRecipe(id) {
    if (confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
        let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        loadRecipes();
    }
}

function addNewIngredient() {
    const container = document.getElementById('ingredients-container');
    const newRow = document.createElement('div');
    newRow.className = 'ingredient-row';
    newRow.innerHTML = `
        <div class="form-group">
            <input type="text" class="ingredient-name" required placeholder="Malzeme adı">
        </div>
        <div class="form-group">
            <input type="number" class="ingredient-amount" required placeholder="Miktar">
        </div>
        <div class="form-group">
            <select class="ingredient-unit">
                <option value="gram">Gram</option>
                <option value="ml">Mililitre</option>
                <option value="adet">Adet</option>
                <option value="yemek_kasigi">Yemek Kaşığı</option>
                <option value="tatli_kasigi">Tatlı Kaşığı</option>
                <option value="cay_kasigi">Çay Kaşığı</option>
                <option value="su_bardagi">Su Bardağı</option>
                <option value="cay_bardagi">Çay Bardağı</option>
            </select>
        </div>
        <button type="button" class="remove-ingredient" title="Malzemeyi Sil">×</button>
    `;

    container.appendChild(newRow);
    
    // Yeni eklenen satırın silme butonuna event listener ekle
    newRow.querySelector('.remove-ingredient').addEventListener('click', function() {
        this.closest('.ingredient-row').remove();
    });
}

function updateIngredients(categoryId) {
    const ingredientSelect = document.getElementById('ingredient');
    ingredientSelect.innerHTML = '';

    const categoryItems = categories[categoryId].items;
    Object.keys(categoryItems).forEach(itemId => {
        const option = document.createElement('option');
        option.value = itemId;
        option.textContent = categoryItems[itemId].name;
        ingredientSelect.appendChild(option);
    });
}

function convertMeasurements() {
    const categoryId = document.getElementById('category').value;
    const itemId = document.getElementById('ingredient').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const inputUnit = document.getElementById('input-unit').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Lütfen geçerli bir miktar girin.');
        return;
    }

    const rates = categories[categoryId].items[itemId].rates;
    let baseValue;
    if (inputUnit === 'gram' || inputUnit === 'ml') {
        baseValue = amount;
    } else {
        baseValue = amount * rates[inputUnit];
    }

    const resultCardsContainer = document.getElementById('result-cards');
    resultCardsContainer.innerHTML = '';

    Object.keys(rates).forEach(unit => {
        if (unit !== inputUnit) {
            let result = baseValue / rates[unit];
            result = Number(result.toFixed(2));

            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <h4>${unitDisplayNames[unit]}</h4>
                <p>${result}</p>
            `;
            resultCardsContainer.appendChild(card);
        }
    });

    document.getElementById('result').style.display = 'block';
}