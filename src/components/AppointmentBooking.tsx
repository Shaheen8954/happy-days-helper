
import { useState } from 'react';
import { Calendar, Clock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  phone: string;
}

const AppointmentBooking = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctor: 'Dr. Smith',
      specialty: 'Family Doctor',
      date: '2024-07-02',
      time: '10:00',
      phone: '(555) 123-4567'
    }
  ]);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    doctor: '',
    specialty: '',
    date: '',
    time: '',
    phone: ''
  });

  const bookAppointment = () => {
    if (newAppointment.doctor && newAppointment.date && newAppointment.time) {
      setAppointments([...appointments, {
        id: Date.now().toString(),
        ...newAppointment
      }]);
      setNewAppointment({ doctor: '', specialty: '', date: '', time: '', phone: '' });
      setShowBookingForm(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-900 mb-4">
          📅 Doctor Appointments
        </h1>
        <p className="text-2xl text-gray-700">
          Manage your medical appointments
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Upcoming Appointments</h2>
          <Button
            onClick={() => setShowBookingForm(!showBookingForm)}
            size="lg"
            className="text-xl px-6 py-3 bg-green-600 hover:bg-green-700"
          >
            <Calendar className="w-6 h-6 mr-2" />
            Book Appointment
          </Button>
        </div>

        {showBookingForm && (
          <Card className="mb-8 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-2xl text-green-900">Book New Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-xl font-medium">Doctor Name</Label>
                <Input
                  value={newAppointment.doctor}
                  onChange={(e) => setNewAppointment({...newAppointment, doctor: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="e.g., Dr. Johnson"
                />
              </div>
              <div>
                <Label className="text-xl font-medium">Specialty</Label>
                <Input
                  value={newAppointment.specialty}
                  onChange={(e) => setNewAppointment({...newAppointment, specialty: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="e.g., Cardiologist"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-xl font-medium">Date</Label>
                  <Input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                    className="text-xl py-3 mt-2"
                  />
                </div>
                <div>
                  <Label className="text-xl font-medium">Time</Label>
                  <Input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                    className="text-xl py-3 mt-2"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xl font-medium">Phone Number</Label>
                <Input
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                  className="text-xl py-3 mt-2"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="flex space-x-4">
                <Button 
                  onClick={bookAppointment}
                  size="lg"
                  className="text-xl px-8 py-3 bg-green-600 hover:bg-green-700"
                >
                  Book Appointment
                </Button>
                <Button 
                  onClick={() => setShowBookingForm(false)}
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
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="p-4 rounded-full bg-green-100">
                      <User className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {appointment.doctor}
                      </h3>
                      <p className="text-xl text-gray-600 mb-2">
                        {appointment.specialty}
                      </p>
                      <div className="flex items-center space-x-4 text-lg text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          {formatDate(appointment.date)}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Button
                      size="lg"
                      className="text-xl px-8 py-4 mb-3 bg-blue-600 hover:bg-blue-700"
                    >
                      <Phone className="w-6 h-6 mr-2" />
                      Call Office
                    </Button>
                    {appointment.phone && (
                      <p className="text-lg text-gray-600 font-mono">
                        {appointment.phone}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {appointments.length === 0 && (
          <Card className="text-center p-12 border-2 border-dashed border-gray-300">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-medium text-gray-600 mb-2">
              No appointments scheduled
            </h3>
            <p className="text-xl text-gray-500">
              Click "Book Appointment" to schedule your next visit
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AppointmentBooking;
