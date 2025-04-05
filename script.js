// Firebase yapılandırması (Firebase Console’dan aldığın yapılandırmayı buraya yapıştır)
const firebaseConfig = {
    apiKey: "AIzaSyBb_mDuwKyWCZz6ix3k9dsN5tJzvn2BGes",
    authDomain: "mutfak-olcu-donusturucu.firebaseapp.com",
    projectId: "mutfak-olcu-donusturucu",
    storageBucket: "mutfak-olcu-donusturucu.firebasestorage.app",
    messagingSenderId: "646146532402",
    appId: "1:646146532402:web:74116fa7414044e0c0482b"
};

// Firebase’i başlat
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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

// Auth işlemleri
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

    registerBtn.addEventListener('click', async () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const ingredient = document.getElementById('favorite-ingredient').value;

        if (!username || !password || !ingredient) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        try {
            const email = `${username}@mutfakapp.com`;
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await db.collection('users').doc(user.uid).set({
                username: username,
                ingredient: ingredient
            });

            alert('Kayıt başarılı! Giriş yapabilirsiniz.');
            authTabs[0].click();
        } catch (error) {
            alert('Kayıt başarısız: ' + error.message);
        }
    });

    loginBtn.addEventListener('click', async () => {
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (!username || !password) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        try {
            const email = `${username}@mutfakapp.com`;
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            const userDoc = await db.collection('users').doc(user.uid).get();
            const userData = userDoc.data();
            const userInfo = {
                uid: user.uid,
                username: userData.username,
                ingredient: userData.ingredient
            };

            localStorage.setItem('currentUser', JSON.stringify(userInfo));
            document.getElementById('auth-container').style.display = 'none';
            document.querySelector('.main-container').style.display = 'block';
            document.querySelector('.subtitle').textContent = `Hoş geldin, ${userInfo.username}!`;
            logoutBtn.style.display = 'inline-block';
            loadRecipes();
        } catch (error) {
            alert('Giriş başarısız: ' + error.message);
        }
    });

    // Kullanıcı oturumunu kontrol et
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection('users').doc(user.uid).get().then(doc => {
                const userData = doc.data();
                const userInfo = {
                    uid: user.uid,
                    username: userData.username,
                    ingredient: userData.ingredient
                };
                localStorage.setItem('currentUser', JSON.stringify(userInfo));
                document.getElementById('auth-container').style.display = 'none';
                document.querySelector('.main-container').style.display = 'block';
                document.querySelector('.subtitle').textContent = `Hoş geldin, ${userInfo.username}!`;
                document.getElementById('logout-btn').style.display = 'inline-block';
                loadRecipes();
            }).catch(error => {
                console.error('Kullanıcı bilgileri alınırken hata:', error);
            });
        }
    });
}

// Logout fonksiyonu
function logout() {
    auth.signOut().then(() => {
        localStorage.removeItem('currentUser');
        document.getElementById('auth-container').style.display = 'flex';
        document.querySelector('.main-container').style.display = 'none';
        document.querySelector('.subtitle').textContent = 'Mutfakta ölçüleri kolayca dönüştürün';
        document.getElementById('logout-btn').style.display = 'none';
    }).catch(error => {
        alert('Çıkış yaparken bir hata oluştu: ' + error.message);
    });
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
    recipeForm.addEventListener('submit', async function(e) {
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
            userId: currentUser.uid,
            name: recipeName,
            description: recipeDescription,
            ingredients: ingredients,
            date: new Date().toLocaleDateString()
        };

        try {
            const docRef = await db.collection('recipes').add(recipe);
            recipe.id = docRef.id;
            addRecipeCard(recipe);
            recipeForm.reset();
            document.querySelectorAll('.ingredient-row').forEach((row, index) => {
                if (index !== 0) row.remove();
            });
            alert('Tarif başarıyla kaydedildi!');
        } catch (error) {
            alert('Tarif kaydedilirken bir hata oluştu: ' + error.message);
        }
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

async function loadRecipes() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    try {
        const snapshot = await db.collection('recipes')
            .where('userId', '==', currentUser.uid)
            .get();
        const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const recipesGrid = document.querySelector('.recipes-grid');
        recipesGrid.innerHTML = recipes.length ? '' : '<p class="no-recipes">Henüz kayıtlı tarif yok.</p>';
        recipes.forEach(recipe => addRecipeCard(recipe));
    } catch (error) {
        alert('Tarifler yüklenirken bir hata oluştu: ' + error.message);
    }
}

async function deleteRecipe(id) {
    if (confirm('Bu tarifi silmek istediğinizden emin misiniz?')) {
        try {
            await db.collection('recipes').doc(id).delete();
            loadRecipes();
            alert('Tarif silindi');
        } catch (error) {
            alert('Tarif silinirken bir hata oluştu: ' + error.message);
        }
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
