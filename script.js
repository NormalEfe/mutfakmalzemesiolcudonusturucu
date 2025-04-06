// Birimlerin gösterim isimleri
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

// Kategorilere göre malzemeleri tanımla (rates değerlerini baştan yuvarlayalım)
const categories = {
    sivi_malzemeler: {
        name: "Sıvı Malzemeler",
        items: {
            sut: {
                name: "Süt",
                density: 1.03, // g/mL
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: parseFloat((200 * 1.03).toFixed(2)), // 206 g
                    cay_bardagi: parseFloat((110 * 1.03).toFixed(2)), // 113.3 g
                    fincan: parseFloat((80 * 1.03).toFixed(2)), // 82.4 g
                    yemek_kasigi: parseFloat((15 * 1.03).toFixed(2)), // 15.45 g
                    tatli_kasigi: parseFloat((5 * 1.03).toFixed(2)), // 5.15 g
                    cay_kasigi: parseFloat((2.5 * 1.03).toFixed(2)) // 2.58 g
                }
            },
            zeytin_yagi: {
                name: "Zeytin Yağı",
                density: 0.92, // g/mL
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: parseFloat((200 * 0.92).toFixed(2)), // 184 g
                    cay_bardagi: parseFloat((110 * 0.92).toFixed(2)), // 101.2 g
                    fincan: parseFloat((80 * 0.92).toFixed(2)), // 73.6 g
                    yemek_kasigi: parseFloat((15 * 0.92).toFixed(2)), // 13.8 g
                    tatli_kasigi: parseFloat((5 * 0.92).toFixed(2)), // 4.6 g
                    cay_kasigi: parseFloat((2.5 * 0.92).toFixed(2)) // 2.3 g
                }
            },
            aycicek_yagi: {
                name: "Ayçiçek Yağı",
                density: 0.92, // g/mL
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: parseFloat((200 * 0.92).toFixed(2)), // 184 g
                    cay_bardagi: parseFloat((110 * 0.92).toFixed(2)), // 101.2 g
                    fincan: parseFloat((80 * 0.92).toFixed(2)), // 73.6 g
                    yemek_kasigi: parseFloat((15 * 0.92).toFixed(2)), // 13.8 g
                    tatli_kasigi: parseFloat((5 * 0.92).toFixed(2)), // 4.6 g
                    cay_kasigi: parseFloat((2.5 * 0.92).toFixed(2)) // 2.3 g
                }
            },
            su: {
                name: "Su",
                density: 1.0, // g/mL
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: parseFloat((200 * 1.0).toFixed(2)), // 200 g
                    cay_bardagi: parseFloat((110 * 1.0).toFixed(2)), // 110 g
                    fincan: parseFloat((80 * 1.0).toFixed(2)), // 80 g
                    yemek_kasigi: parseFloat((15 * 1.0).toFixed(2)), // 15 g
                    tatli_kasigi: parseFloat((5 * 1.0).toFixed(2)), // 5 g
                    cay_kasigi: parseFloat((2.5 * 1.0).toFixed(2)) // 2.5 g
                }
            },
            yogurt: {
                name: "Yoğurt",
                density: 1.04, // g/mL
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: parseFloat((200 * 1.04).toFixed(2)), // 208 g
                    cay_bardagi: parseFloat((110 * 1.04).toFixed(2)), // 114.4 g
                    fincan: parseFloat((80 * 1.04).toFixed(2)), // 83.2 g
                    yemek_kasigi: parseFloat((15 * 1.04).toFixed(2)), // 15.6 g
                    tatli_kasigi: parseFloat((5 * 1.04).toFixed(2)), // 5.2 g
                    cay_kasigi: parseFloat((2.5 * 1.04).toFixed(2)) // 2.6 g
                }
            }
        }
    },
    kati_malzemeler: {
        name: "Katı Malzemeler",
        items: {
            un: {
                name: "Un",
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: 120,
                    cay_bardagi: 66,
                    fincan: 48,
                    yemek_kasigi: 9,
                    tatli_kasigi: 3,
                    cay_kasigi: 1.5
                }
            },
            toz_seker: {
                name: "Toz Şeker",
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: 175,
                    cay_bardagi: 96.25,
                    fincan: 70,
                    yemek_kasigi: 13.125,
                    tatli_kasigi: 4.375,
                    cay_kasigi: 2.1875
                }
            },
            pirinc: {
                name: "Pirinç",
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: 165,
                    cay_bardagi: 90.75,
                    fincan: 66,
                    yemek_kasigi: 12.375,
                    tatli_kasigi: 4.125,
                    cay_kasigi: 2.0625
                }
            },
            bulgur: {
                name: "Bulgur",
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: 150,
                    cay_bardagi: 82.5,
                    fincan: 60,
                    yemek_kasigi: 11.25,
                    tatli_kasigi: 3.75,
                    cay_kasigi: 1.875
                }
            },
            tereyagi: {
                name: "Tereyağı",
                rates: {
                    gram: 1,
                    ml: 1,
                    su_bardagi: 225,
                    cay_bardagi: 123.75,
                    fincan: 90,
                    yemek_kasigi: 16.875,
                    tatli_kasigi: 5.625,
                    cay_kasigi: 2.8125
                }
            }
        }
    }
};

// Tabloyu güncelle (değerleri yuvarlayarak göster)
function updateTable() {
    const siviTableBody = document.getElementById('sivi-conversion-table-body');
    const katiTableBody = document.getElementById('kati-conversion-table-body');

    // Sıvı Malzemeler Tablosu
    siviTableBody.innerHTML = '';
    Object.keys(categories.sivi_malzemeler.items).forEach(ingredientId => {
        const ingredient = categories.sivi_malzemeler.items[ingredientId];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ingredient.name}</td>
            <td>${parseFloat(ingredient.rates.su_bardagi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.cay_bardagi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.fincan.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.yemek_kasigi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.tatli_kasigi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.cay_kasigi.toFixed(2))}g</td>
        `;
        siviTableBody.appendChild(row);
    });

    // Katı Malzemeler Tablosu
    katiTableBody.innerHTML = '';
    Object.keys(categories.kati_malzemeler.items).forEach(ingredientId => {
        const ingredient = categories.kati_malzemeler.items[ingredientId];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ingredient.name}</td>
            <td>${parseFloat(ingredient.rates.su_bardagi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.cay_bardagi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.fincan.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.yemek_kasigi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.tatli_kasigi.toFixed(2))}g</td>
            <td>${parseFloat(ingredient.rates.cay_kasigi.toFixed(2))}g</td>
        `;
        katiTableBody.appendChild(row);
    });
}

// Auth işlemleri
function initAuth() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutBtn = document.getElementById('logout-btn');

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

        const users = JSON.parse(localStorage.getItem('users') || '[]');

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
            logoutBtn.style.display = 'inline-block';
        } else {
            alert('Kullanıcı adı veya şifre hatalı!');
        }
    });

    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        document.getElementById('auth-container').style.display = 'none';
        document.querySelector('.main-container').style.display = 'block';
        document.querySelector('.subtitle').textContent = `Hoş geldin, ${JSON.parse(currentUser).username}!`;
        logoutBtn.style.display = 'inline-block';
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

// Sekme değiştirme fonksiyonu
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');

            if (button.dataset.tab === 'converter') {
                const converterContent = document.querySelector('.converter-container');
                const converterTab = document.getElementById('converter');
                converterTab.innerHTML = '';
                converterTab.appendChild(converterContent);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Tabloyu güncelle
    updateTable();

    initAuth();
    initTabs();

    const categorySelect = document.getElementById('category');
    const ingredientSelect = document.getElementById('ingredient');
    const convertBtn = document.getElementById('convert-btn');

    // İlk kategorinin malzemelerini yükle
    updateIngredients(categorySelect.value);

    // Event listeners
    categorySelect.addEventListener('change', function() {
        updateIngredients(this.value);
    });

    convertBtn.addEventListener('click', () => convertMeasurements());

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
            <button class="delete-recipe" onclick="deleteRecipe(${recipe.id})">Sil</button>
        </div>
    `;
    recipesGrid.appendChild(card);
}

function loadRecipes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
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
    const itemId = document.getElementById('ingredient').value.toLowerCase();
    const amount = parseFloat(document.getElementById('amount').value);
    const inputUnit = document.getElementById('input-unit').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Lütfen geçerli bir miktar girin.');
        return;
    }

    const ingredient = categories[categoryId].items[itemId];
    const rates = ingredient.rates;
    let baseValue;

    // Sıvı malzemeler için yoğunluk kullanarak dönüşüm
    if (categoryId === 'sivi_malzemeler') {
        const density = ingredient.density;
        if (inputUnit === 'gram') {
            baseValue = amount; // Gram zaten temel birim
        } else if (inputUnit === 'ml') {
            baseValue = parseFloat((amount * density).toFixed(2)); // mL'yi gram'a çevir: mL * yoğunluk
        } else {
            // Diğer birimler için önce mL'ye çevir, sonra gram'a
            const mlPerUnit = parseFloat((rates[inputUnit] / density).toFixed(2)); // Örneğin, 1 su bardağı süt: 206 g / 1.03 = 200 mL
            const totalMl = parseFloat((amount * mlPerUnit).toFixed(2));
            baseValue = parseFloat((totalMl * density).toFixed(2)); // Gram = mL * yoğunluk
        }
    } else {
        // Katı malzemeler için mevcut mantığı kullan
        if (inputUnit === 'gram' || inputUnit === 'ml') {
            baseValue = amount;
        } else {
            baseValue = parseFloat((amount * rates[inputUnit]).toFixed(2));
        }
    }

    const resultCardsContainer = document.getElementById('result-cards');
    resultCardsContainer.innerHTML = '';

    Object.keys(rates).forEach(unit => {
        if (unit !== inputUnit) {
            let result;
            if (categoryId === 'sivi_malzemeler') {
                // Sıvılar için: önce gram'ı mL'ye çevir, sonra hedef birime
                const density = ingredient.density;
                const totalMl = parseFloat((baseValue / density).toFixed(2)); // Gram'ı mL'ye çevir
                if (unit === 'gram') {
                    result = baseValue;
                } else if (unit === 'ml') {
                    result = totalMl;
                } else {
                    const mlPerUnit = parseFloat((rates[unit] / density).toFixed(2)); // Örneğin, 1 yemek kaşığı süt: 15.45 g / 1.03 = 15 mL
                    result = parseFloat((totalMl / mlPerUnit).toFixed(2));
                }
            } else {
                // Katı malzemeler için mevcut mantık
                result = parseFloat((baseValue / rates[unit]).toFixed(2));
            }

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
