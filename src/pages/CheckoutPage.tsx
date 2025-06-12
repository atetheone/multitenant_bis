import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { DeliveryZone } from '../types';
import DeliveryZoneSelector from '../components/common/DeliveryZoneSelector';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'mobile' | 'cash'>('mobile');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    additionalInfo: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = selectedZone?.deliveryFee || 0;
  const totalWithDelivery = totalPrice + deliveryFee;

  const handleInputChange = (field: string, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!selectedZone) {
      alert('Veuillez sélectionner une zone de livraison');
      return;
    }

    if (!shippingInfo.fullName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect
    clearCart();
    navigate('/customer/orders', { 
      state: { 
        orderSuccess: true, 
        orderTotal: totalWithDelivery,
        deliveryZone: selectedZone.name 
      } 
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Panier Vide</h2>
        <p className="text-gray-600 mb-8">Votre panier est vide. Ajoutez des produits pour continuer.</p>
        <Button variant="primary" onClick={() => navigate('/marketplace')}>
          Continuer les Achats
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour au Panier
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la Commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Forms */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Informations de Livraison</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Nom Complet *"
                value={shippingInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                fullWidth
              />
              <Input
                label="Téléphone *"
                value={shippingInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                fullWidth
              />
              <Input
                label="Adresse Complète *"
                value={shippingInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                fullWidth
                className="md:col-span-2"
              />
              <Input
                label="Ville *"
                value={shippingInfo.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                fullWidth
              />
              <Input
                label="Informations Supplémentaires"
                value={shippingInfo.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                fullWidth
                placeholder="Point de repère, étage, etc."
              />
            </div>
          </div>

          {/* Delivery Zone */}
          <DeliveryZoneSelector
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
            userCity={shippingInfo.city}
          />

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Mode de Paiement</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="mobile-money"
                  type="radio"
                  name="payment"
                  value="mobile"
                  checked={paymentMethod === 'mobile'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'mobile')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="mobile-money" className="ml-3 text-sm text-gray-700">
                  Mobile Money (Orange Money, Wave, Free Money)
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="cash-delivery"
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="cash-delivery" className="ml-3 text-sm text-gray-700">
                  Paiement à la Livraison
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="card"
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="card" className="ml-3 text-sm text-gray-700">
                  Carte Bancaire
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé de la Commande</h3>
            
            {/* Order Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {(item.product.price * item.quantity).toLocaleString()} FCFA
                  </p>
                </div>
              ))}
            </div>
            
            {/* Pricing Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-gray-900">{totalPrice.toLocaleString()} FCFA</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Livraison</span>
                <span className="text-gray-900">
                  {selectedZone ? `${deliveryFee.toLocaleString()} FCFA` : 'À sélectionner'}
                </span>
              </div>
              
              {selectedZone && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Zone: {selectedZone.name}</span>
                  <span>Délai: {selectedZone.estimatedDeliveryTime}</span>
                </div>
              )}
              
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-medium text-lg">
                  <span className="text-gray-900">Total</span>
                  <span className="text-blue-600">
                    {selectedZone ? `${totalWithDelivery.toLocaleString()} FCFA` : `${totalPrice.toLocaleString()}+ FCFA`}
                  </span>
                </div>
              </div>
            </div>
            
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              className="mt-6"
              onClick={handlePlaceOrder}
              disabled={isProcessing || !selectedZone}
            >
              {isProcessing ? 'Traitement...' : 'Confirmer la Commande'}
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              En confirmant votre commande, vous acceptez nos conditions de vente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;