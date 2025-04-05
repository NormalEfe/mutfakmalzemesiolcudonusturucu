// Kategoriler ve malzemeler
const categories = {
    mutfak: {
        name: "Mutfak Malzemeleri",
        items: {
            sut: {
                name: "Süt",
                rates: {
                    gram: 1,
                    ml: 1,
                    yemek_kasigi: 15,
                    tatli_kasigi: 5,
                    cay_kasigi: 2.5,
                    su_bardagi: 200,
                    cay_bardagi: 110,
                    fincan: 80
                }
            },
            un: {
                name: "Un",
                rates: {
                    gram: 1,
                    ml: 1.82,
                    yemek_kasigi: 8,
                    tatli_kasigi: 3,
                    cay_kasigi: 1.5,
                    su_bardagi: 110,
                    cay_bardagi: 65,
                    fincan: 45
                }
            },
            toz_seker: {
                name: "Toz Şeker",
                rates: {
                    gram: 1,
                    ml: 1.18,
                    yemek_kasigi: 13,
                    tatli_kasigi: 4,
                    cay_kasigi: 2,
                    su_bardagi: 170,
                    cay_bardagi: 95,
                    fincan: 70
                }
            },
            pirinc: {
                name: "Pirinç",
                rates: {
                    gram: 1,
                    ml: 1.25,
                    yemek_kasigi: 12,
                    tatli_kasigi: 4,
                    cay_kasigi: 2,
                    su_bardagi: 165,
                    cay_bardagi: 90,
                    fincan: 65
                }
            },
            bulgur: {
                name: "Bulgur",
                rates: {
                    gram: 1,
                    ml: 1.33,
                    yemek_kasigi: 11,
                    tatli_kasigi: 4,
                    cay_kasigi: 2,
                    su_bardagi: 150,
                    cay_bardagi: 85,
                    fincan: 60
                }
            },
            sivi_yag: {
                name: "Sıvı Yağ",
                rates: {
                    gram: 1,
                    ml: 1.09,
                    yemek_kasigi: 14,
                    tatli_kasigi: 5,
                    cay_kasigi: 2.5,
                    su_bardagi: 185,
                    cay_bardagi: 100,
                    fincan: 75
                }
            },
            su: {
                name: "Su",
                rates: {
                    gram: 1,
                    ml: 1,
                    yemek_kasigi: 15,
                    tatli_kasigi: 5,
                    cay_kasigi: 2.5,
                    su_bardagi: 200,
                    cay_bardagi: 110,
                    fincan: 80
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

// Auth işlemleri (localStorage ile)
function initAuth() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Hata ayıklama: Butonlar bulundu mu?
    if (!loginBtn) console.error("Giriş butonu bulunamadı!");
    if (!registerBtn) console.error("Kayıt butonu bulunamadı!");

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}-form`).classList.add('active');
        });
    });

    registerBtn.addEventListener('click', () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const ingredient = document.getElementById('favorite-ingredient').value;

        if (!username || !password || !ingredient) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        // localStorage'dan mevcut kullanıcıları al
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Kullanıcı adı zaten var mı kontrol et
        if (users.some(user => user.username === username)) {
            alert('Bu kullanıcı adı zaten alınmış!');
            return;
        }

        // Yeni kullanıcıyı ekle
        const newUser = {
            username: username,
            password: password, // Not: Gerçek uygulamalarda şifreyi hash'lemek gerekir
            ingredient: ingredient
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        authTabs[0].click();
    });

    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (!username || !password) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        // localStorage'dan kullanıcıları al
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert('Kullanıcı adı veya şifre yanlış!');
            return;
        }

        // Kullanıcıyı oturum açmış olarak işaretle
        const userInfo = {
            username: user.username,
            ingredient: user.ingredient
        };
        localStorage.setItem('currentUser', JSON.stringify(userInfo));

        document.getElementById('auth-container').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        document.querySelector('.subtitle').textContent = `Hoş geldin, ${userInfo.username}!`;
        logoutBtn.style.display = 'inline-block';
        loadRecipes();
    });

    // Oturum kontrolü
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        document.getElementById('auth-container').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        document.querySelector('.subtitle').textContent = `Hoş geldin, ${currentUser.username}!`;
        document.getElementById('logout-btn').style.display = 'inline-block';
        loadRecipes();
    }
}

// Logout fonksiyonu
function logout() {
    localStorage.removeItem('currentUser');
    document.getElementById('auth-container').style.display = 'flex';
    document.querySelector('.main-container').style.display = 'none';
    document.querySelector('.subtitle').textContent = 'Mutfakta ölçüleri kolayca dönüştürün';
    document.getElementById('logout-btn').style.display = 'none';
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
            username: currentUser.username, // Kullanıcıya göre tarifleri ayırmak için
            id: Date.now().toString(), // Benzersiz bir ID oluştur
            name: recipeName,
            description: recipeDescription,
            ingredients: ingredients,
            date: new Date().toLocaleDateString()
        };

        // localStorage'dan mevcut tarifleri al
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        addRecipeCard(recipe);
        recipeForm.reset();
        document.querySelectorAll('.ingredient-row').forEach((row, index) => {
            if (index !== 0) row.remove();
        });
        alert('Tarif başarıyla kaydedildi!');
    });

    // Logout butonuna event listener ekle
    document.getElementById('logout-btn').addEventListener('click', logout);
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
            <button class="delete-recipe" onclick="deleteRecipe('${recipe.id}')">Sil</button>
        </div>
    `;
    recipesGrid.appendChild(card);
}

function loadRecipes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const userRecipes = recipes.filter(recipe => recipe.username === currentUser.username);
    const recipesGrid = document.querySelector('.recipes-grid');
    recipesGrid.innerHTML = userRecipes.length ? '' : '<p class="no-recipes">Henüz kayıtlı tarif yok.</p>';
    userRecipes.forEach(recipe => addRecipeCard(recipe));
}

function deleteRecipe(id) {
    if (confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
        const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        loadRecipes();
        alert('Tarif silindi');
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
