// Room data
const roomTypes = [
    {
        id: 1,
        name: "Superior Twin",
        description: "Spacious room with two single beds, perfect for friends or colleagues",
        price: 120,
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 2,
        amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service"]
    },
    {
        id: 2,
        name: "Superior Double",
        description: "Elegant room with a comfortable double bed, ideal for couples",
        price: 150,
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 2,
        amenities: ["Free WiFi", "Air Conditioning", "Balcony", "Room Service", "Mini Bar"]
    },
    {
        id: 3,
        name: "Family Room",
        description: "Large family room with multiple beds, perfect for families with children",
        price: 200,
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 4,
        amenities: ["Free WiFi", "Air Conditioning", "Kitchen", "Living Area", "Balcony"]
    },
    {
        id: 4,
        name: "Superior Triple",
        description: "Comfortable room with three beds, great for small groups",
        price: 180,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 3,
        amenities: ["Free WiFi", "Air Conditioning", "Mini Bar", "Room Service", "City View"]
    },
    {
        id: 5,
        name: "Quad Room",
        description: "Spacious room for four people with two comfortable double beds",
        price: 220,
        image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 4,
        amenities: ["Free WiFi", "Air Conditioning", "Two Double Beds", "Room Service", "City View"]
    },
    {
        id: 6,
        name: "Studio Room",
        description: "Combined living room and bedroom with a small kitchen area",
        price: 250,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 2,
        amenities: ["Free WiFi", "Air Conditioning", "Kitchenette", "Living Area", "Balcony"]
    },
    {
        id: 7,
        name: "Suite",
        description: "Larger, more luxurious room with a separate living area and premium amenities",
        price: 350,
        image: "https://techcrunch.com/wp-content/uploads/2016/12/dream-presidential-suite-terrace.jpg",
        capacity: 4,
        amenities: ["Free WiFi", "Air Conditioning", "Separate Living Area", "Premium Toiletries", "Butler Service"]
    },
    {
        id: 8,
        name: "Presidential Suite",
        description: "The most luxurious option with premium amenities and stunning city views",
        price: 800,
        image: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 6,
        amenities: ["Free WiFi", "Air Conditioning", "Private Jacuzzi", "Butler Service", "Champagne Service", "City View"]
    },
    {
        id: 9,
        name: "Connecting Rooms",
        description: "Two adjacent rooms with a door in between, perfect for families or groups",
        price: 300,
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 6,
        amenities: ["Free WiFi", "Air Conditioning", "Two Separate Rooms", "Connecting Door", "Room Service"]
    },
    {
        id: 10,
        name: "Accessible Room",
        description: "Specially designed room with accessibility features for guests with disabilities",
        price: 140,
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        capacity: 2,
        amenities: ["Free WiFi", "Air Conditioning", "Wheelchair Accessible", "Roll-in Shower", "Accessible Bathroom"]
    }
];

// Global variables
let currentUser = null;
let selectedRoom = null;

// DOM elements
const authModal = document.getElementById('auth-modal');
const bookingModal = document.getElementById('booking-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const userInfo = document.getElementById('user-info');
const authButtons = document.getElementById('auth-buttons');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadRooms();
    checkUserSession();
    setupEventListeners();
});

// Load user session from localStorage
function checkUserSession() {
    const savedUser = localStorage.getItem('hotelUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserInterface();
    }
}

// Update UI based on user authentication status
function updateUserInterface() {
    if (currentUser) {
        document.getElementById('welcome-name').textContent = `Welcome, ${currentUser.name}`;
        document.getElementById('user-email').textContent = currentUser.email;
        userInfo.style.display = 'flex';
        authButtons.style.display = 'none';
    } else {
        userInfo.style.display = 'none';
        authButtons.style.display = 'flex';
    }
}

// Load rooms into the grid
function loadRooms() {
    const container = document.getElementById('rooms-container');
    container.innerHTML = '';
    
    roomTypes.forEach(room => {
        const roomCard = createRoomCard(room);
        container.appendChild(roomCard);
    });
}

// Create a room card element
function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = 'room-card';
    
    card.innerHTML = `
        <div class="room-image">
            <img src="${room.image}" alt="${room.name}">
            <div class="price-badge">$${room.price}/night</div>
            <div class="capacity-badge">
                <i class="fas fa-users"></i>
                ${room.capacity} Guests
            </div>
        </div>
        <div class="room-content">
            <div class="room-header">
                <div>
                    <div class="room-title">${room.name}</div>
                    <div class="room-description">${room.description}</div>
                </div>
                <div class="stars">
                    ${Array(5).fill('<i class="fas fa-star star"></i>').join('')}
                </div>
            </div>
            <div class="amenities-section">
                <div class="amenities-label">Amenities:</div>
                <div class="amenities-list">
                    ${room.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
            </div>
            <button class="book-btn" onclick="openBookingModal(${room.id})">
                <i class="fas fa-calendar-alt"></i>
                Book Now - $${room.price}/night
            </button>
        </div>
    `;
    
    return card;
}

// Setup event listeners
function setupEventListeners() {
    // Auth modal buttons
    loginBtn.addEventListener('click', () => openAuthModal('login'));
    registerBtn.addEventListener('click', () => openAuthModal('register'));
    logoutBtn.addEventListener('click', logout);
    
    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
    
    // Tab switching
    document.getElementById('login-tab').addEventListener('click', () => switchTab('login'));
    document.getElementById('register-tab').addEventListener('click', () => switchTab('register'));
    
    // Form submissions
    document.getElementById('login-form-element').addEventListener('submit', handleLogin);
    document.getElementById('register-form-element').addEventListener('submit', handleRegister);
    
    // Password toggle
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', togglePassword);
    });
}

// Open authentication modal
function openAuthModal(mode) {
    authModal.classList.add('show');
    switchTab(mode);
}

// Switch between login and register tabs
function switchTab(mode) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (mode === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Get saved users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
    const user = savedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('hotelUser', JSON.stringify(user));
        updateUserInterface();
        closeModals();
        showToast('Login Successful', `Welcome back, ${user.name}!`, 'success');
        
        // Clear form
        document.getElementById('login-form-element').reset();
    } else {
        showToast('Login Failed', 'Invalid email or password.', 'error');
    }
}

// Handle register form submission
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    if (password !== confirmPassword) {
        showToast('Registration Failed', 'Passwords do not match.', 'error');
        return;
    }
    
    // Get saved users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem('hotelUsers') || '[]');
    const existingUser = savedUsers.find(u => u.email === email);
    
    if (existingUser) {
        showToast('Registration Failed', 'Email already exists.', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };
    
    savedUsers.push(newUser);
    localStorage.setItem('hotelUsers', JSON.stringify(savedUsers));
    
    currentUser = newUser;
    localStorage.setItem('hotelUser', JSON.stringify(newUser));
    updateUserInterface();
    closeModals();
    showToast('Registration Successful', `Welcome, ${newUser.name}!`, 'success');
    
    // Clear form
    document.getElementById('register-form-element').reset();
}

// Logout user
function logout() {
    localStorage.removeItem('hotelUser');
    currentUser = null;
    updateUserInterface();
    showToast('Logged Out', 'You have been successfully logged out.', 'success');
}

// Toggle password visibility
function togglePassword(e) {
    const input = e.target.closest('.input-group').querySelector('input');
    const icon = e.target.closest('.password-toggle').querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

// Open booking modal
function openBookingModal(roomId) {
    if (!currentUser) {
        openAuthModal('login');
        showToast('Authentication Required', 'Please log in to book a room.', 'error');
        return;
    }
    
    selectedRoom = roomTypes.find(room => room.id === roomId);
    if (!selectedRoom) return;
    
    document.getElementById('booking-title').textContent = `Book ${selectedRoom.name}`;
    createBookingForm();
    bookingModal.classList.add('show');
}

// Create booking form
function createBookingForm() {
    const content = document.getElementById('booking-form-content');
    const today = new Date().toISOString().split('T')[0];
    
    content.innerHTML = `
        <div class="booking-summary">
            <div class="summary-row">
                <span>Room:</span>
                <span>${selectedRoom.name}</span>
            </div>
            <div class="summary-row">
                <span>Price per night:</span>
                <span>$${selectedRoom.price}</span>
            </div>
        </div>
        
        <form id="booking-form-element">
            <div class="grid-2">
                <div class="form-group">
                    <label for="check-in">Check-in Date</label>
                    <div class="input-group">
                        <i class="fas fa-calendar-alt"></i>
                        <input type="date" id="check-in" min="${today}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="check-out">Check-out Date</label>
                    <div class="input-group">
                        <i class="fas fa-calendar-alt"></i>
                        <input type="date" id="check-out" min="${today}" required>
                    </div>
                </div>
            </div>
            
            <div class="grid-2">
                <div class="form-group">
                    <label for="guests">Number of Guests</label>
                    <div class="input-group">
                        <i class="fas fa-users"></i>
                        <input type="number" id="guests" min="1" max="${selectedRoom.capacity}" value="1" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <div class="input-group">
                        <i class="fas fa-phone"></i>
                        <input type="tel" id="phone" placeholder="Your phone number" required>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label for="address">Address</label>
                <div class="input-group">
                    <i class="fas fa-map-marker-alt"></i>
                    <input type="text" id="address" placeholder="Your address" required>
                </div>
            </div>
            
            <div class="form-group">
                <label for="special-requests">Special Requests (Optional)</label>
                <textarea id="special-requests" placeholder="Any special requests or requirements..." rows="3"></textarea>
            </div>
            
            <h4 style="margin: 1.5rem 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-credit-card"></i>
                Payment Information
            </h4>
            
            <div class="form-group">
                <label for="card-name">Cardholder Name</label>
                <input type="text" id="card-name" placeholder="Name on card" required>
            </div>
            
            <div class="form-group">
                <label for="card-number">Card Number</label>
                <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxlength="19" required>
            </div>
            
            <div class="grid-2">
                <div class="form-group">
                    <label for="card-expiry">Expiry Date</label>
                    <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5" required>
                </div>
                
                <div class="form-group">
                    <label for="card-cvv">CVV</label>
                    <input type="text" id="card-cvv" placeholder="123" maxlength="3" required>
                </div>
            </div>
            
            <div id="total-section" class="booking-summary" style="margin: 1.5rem 0;">
                <div class="summary-row">
                    <span>Total Amount:</span>
                    <span id="total-amount">$0</span>
                </div>
                <div id="nights-info" style="font-size: 0.875rem; color: #6b7280; margin-top: 0.5rem;"></div>
            </div>
            
            <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
                <button type="button" class="btn btn-outline" style="flex: 1;" onclick="closeModals()">Cancel</button>
                <button type="submit" class="btn btn-primary" style="flex: 1;" id="submit-booking">Book Now</button>
            </div>
        </form>
    `;
    
    // Setup form event listeners
    document.getElementById('booking-form-element').addEventListener('submit', handleBooking);
    document.getElementById('check-in').addEventListener('change', calculateTotal);
    document.getElementById('check-out').addEventListener('change', calculateTotal);
    
    // Format card number input
    document.getElementById('card-number').addEventListener('input', formatCardNumber);
    document.getElementById('card-expiry').addEventListener('input', formatExpiry);
}

// Calculate total booking cost
function calculateTotal() {
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    
    if (!checkIn || !checkOut) return;
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights > 0) {
        const total = nights * selectedRoom.price;
        document.getElementById('total-amount').textContent = `$${total}`;
        document.getElementById('nights-info').textContent = `${nights} nights × $${selectedRoom.price}/night`;
        document.getElementById('submit-booking').textContent = `Book Now - $${total}`;
    } else {
        document.getElementById('total-amount').textContent = '$0';
        document.getElementById('nights-info').textContent = '';
        document.getElementById('submit-booking').textContent = 'Book Now';
    }
}

// Format card number input (add spaces)
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

// Format expiry date input
function formatExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0,2) + '/' + value.substring(2,4);
    }
    e.target.value = value;
}

// Handle booking form submission
function handleBooking(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const checkIn = document.getElementById('check-in').value;
    const checkOut = document.getElementById('check-out').value;
    
    if (!checkIn || !checkOut) {
        showToast('Booking Failed', 'Please select check-in and check-out dates.', 'error');
        return;
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
        showToast('Booking Failed', 'Check-out date must be after check-in date.', 'error');
        return;
    }
    
    const total = nights * selectedRoom.price;
    
    // Create booking object
    const booking = {
        id: Date.now(),
        userId: currentUser.id,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        checkIn,
        checkOut,
        guests: document.getElementById('guests').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        specialRequests: document.getElementById('special-requests').value,
        totalAmount: total,
        nights,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };
    
    // Save booking to localStorage
    const savedBookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
    savedBookings.push(booking);
    localStorage.setItem('hotelBookings', JSON.stringify(savedBookings));
    
    // Show success message
    showBookingConfirmation(booking);
}

// Show booking confirmation
function showBookingConfirmation(booking) {
    const content = document.getElementById('booking-form-content');
    content.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="width: 5rem; height: 5rem; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <i class="fas fa-check" style="color: white; font-size: 2rem;"></i>
            </div>
            
            <h3 style="color: #1f2937; margin-bottom: 0.5rem;">Booking Successful!</h3>
            <p style="color: #6b7280; margin-bottom: 2rem;">Thank you for choosing Luxury Hotel. Your booking has been confirmed.</p>
            
            <div class="booking-summary">
                <div class="summary-row">
                    <span>Room:</span>
                    <span>${booking.roomName}</span>
                </div>
                <div class="summary-row">
                    <span>Check-in:</span>
                    <span>${booking.checkIn}</span>
                </div>
                <div class="summary-row">
                    <span>Check-out:</span>
                    <span>${booking.checkOut}</span>
                </div>
                <div class="summary-row">
                    <span>Total Amount:</span>
                    <span>$${booking.totalAmount}</span>
                </div>
            </div>
            
            <button class="btn btn-primary full-width" onclick="closeModals()" style="margin-top: 1.5rem;">
                Close
            </button>
        </div>
    `;
    
    showToast('Booking Confirmed!', `Your ${booking.roomName} has been successfully booked.`, 'success');
}

// Close all modals
function closeModals() {
    authModal.classList.remove('show');
    bookingModal.classList.remove('show');
    
    // Clear forms
    document.querySelectorAll('form').forEach(form => form.reset());
}

// Show toast notification
function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = toast.querySelector('.toast-icon');
    const titleEl = toast.querySelector('.toast-title');
    const messageEl = toast.querySelector('.toast-message');
    
    // Set content
    titleEl.textContent = title;
    messageEl.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        icon.className = 'toast-icon fas fa-check-circle';
        toast.className = 'toast success';
    } else if (type === 'error') {
        icon.className = 'toast-icon fas fa-exclamation-circle';
        toast.className = 'toast error';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}
