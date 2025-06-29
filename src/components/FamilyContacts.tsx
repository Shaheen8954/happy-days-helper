
import { useState } from 'react';
import { Phone, Video, Users, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  photo?: string;
}

const FamilyContacts = () => {
  const [family, setFamily] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      relationship: 'Daughter',
      phone: '(555) 234-5678'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      relationship: 'Son',
      phone: '(555) 345-6789'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      relationship: 'Granddaughter',
      phone: '(555) 456-7890'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  const addContact = () => {
    if (newContact.name && newContact.relationship && newContact.phone) {
      setFamily([...family, {
        id: Date.now().toString(),
        ...newContact
      }]);
      setNewContact({ name: '', relationship: '', phone: '' });
      setShowAddForm(false);
    }
  };

  const handleCall = (contact: FamilyMember) => {
    // In a real app, this would integrate with WebRTC or phone system
    alert(`Calling ${contact.name} at ${contact.phone}`);
  };

  const handleVideoCall = (contact: FamilyMember) => {
    // In a real app, this would start a video call
    alert(`Starting video call with ${contact.name}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-purple-900 mb-4">
          👨‍👩‍👧‍👦 Family Contacts
        </h1>
        <p className="text-2xl text-gray-700">
          Stay connected with your loved ones
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Family</h2>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="lg"
            className="text-xl px-6 py-3 bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Contact
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900">Add Family Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-xl font-medium">Name</Label>
                <Input
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="e.g., John Smith"
                />
              </div>
              <div>
                <Label className="text-xl font-medium">Relationship</Label>
                <Input
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="e.g., Son, Daughter, Friend"
                />
              </div>
              <div>
                <Label className="text-xl font-medium">Phone Number</Label>
                <Input
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  onClick={addContact}
                  size="lg"
                  className="text-xl px-8 py-3 bg-purple-600 hover:bg-purple-700"
                >
                  Add Contact
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                  size="lg"
                  className="text-xl px-8 py-3"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {family.map((contact) => (
            <Card key={contact.id} className="border-2 border-purple-200 bg-purple-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center">
                      <Heart className="w-10 h-10 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-1">
                        {contact.name}
                      </h3>
                      <p className="text-xl text-gray-600 mb-2">
                        {contact.relationship}
                      </p>
                      <p className="text-lg text-gray-600 font-mono">
                        {contact.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3">
                    <Button
                      onClick={() => handleCall(contact)}
                      size="lg"
                      className="text-xl px-8 py-4 bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-6 h-6 mr-2" />
                      Call
                    </Button>
                    <Button
                      onClick={() => handleVideoCall(contact)}
                      size="lg"
                      variant="outline"
                      className="text-xl px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <Video className="w-6 h-6 mr-2" />
                      Video Call
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {family.length === 0 && (
          <Card className="text-center p-12 border-2 border-dashed border-gray-300">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-medium text-gray-600 mb-2">
              No family contacts added yet
            </h3>
            <p className="text-xl text-gray-500">
              Click "Add Contact" to add your family members
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FamilyContacts;
