
import { useState } from 'react';
import { Plus, Bell, Clock, Pill } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
}

const MedicineReminders = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: '1',
      name: 'Blood Pressure Medicine',
      dosage: '1 tablet',
      time: '08:00',
      taken: false
    },
    {
      id: '2',
      name: 'Vitamin D',
      dosage: '2 tablets',
      time: '12:00',
      taken: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    time: ''
  });

  const toggleTaken = (id: string) => {
    setMedicines(medicines.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const addMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.time) {
      setMedicines([...medicines, {
        id: Date.now().toString(),
        ...newMedicine,
        taken: false
      }]);
      setNewMedicine({ name: '', dosage: '', time: '' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          💊 Medicine Reminders
        </h1>
        <p className="text-2xl text-gray-700">
          Keep track of your daily medications
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Today's Schedule</h2>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="lg"
            className="text-xl px-6 py-3"
          >
            <Plus className="w-6 h-6 mr-2" />
            Add Medicine
          </Button>
        </div>

        {showAddForm && (
          <Card className="mb-8 border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Add New Medicine</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-xl font-medium">Medicine Name</Label>
                <Input
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="e.g., Blood Pressure Medicine"
                />
              </div>
              <div>
                <Label className="text-xl font-medium">Dosage</Label>
                <Input
                  value={newMedicine.dosage}
                  onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="e.g., 1 tablet"
                />
              </div>
              <div>
                <Label className="text-xl font-medium">Time</Label>
                <Input
                  type="time"
                  value={newMedicine.time}
                  onChange={(e) => setNewMedicine({...newMedicine, time: e.target.value})}
                  className="text-xl py-3 mt-2"
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  onClick={addMedicine}
                  size="lg"
                  className="text-xl px-8 py-3"
                >
                  Save Medicine
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
          {medicines.map((medicine) => (
            <Card 
              key={medicine.id} 
              className={`border-2 ${
                medicine.taken 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className={`p-4 rounded-full ${
                      medicine.taken ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <Pill className={`w-8 h-8 ${
                        medicine.taken ? 'text-green-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {medicine.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-xl text-gray-600">
                        <span>💊 {medicine.dosage}</span>
                        <span className="flex items-center">
                          <Clock className="w-5 h-5 mr-1" />
                          {medicine.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => toggleTaken(medicine.id)}
                    size="lg"
                    variant={medicine.taken ? "secondary" : "default"}
                    className="text-xl px-8 py-4"
                  >
                    {medicine.taken ? '✅ Taken' : 'Mark as Taken'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {medicines.length === 0 && (
          <Card className="text-center p-12 border-2 border-dashed border-gray-300">
            <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-medium text-gray-600 mb-2">
              No medicines added yet
            </h3>
            <p className="text-xl text-gray-500">
              Click "Add Medicine" to get started
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MedicineReminders;
