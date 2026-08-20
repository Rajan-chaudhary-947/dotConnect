import Event from "../models/event.model.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ dateAndTime: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createEvent = async (req, res) => {
  const {
    title,
    bannerLink,
    organizer,
    dateAndTime,
    location,
    description,
    registrationLink,
  } = req.body;

  const newEvent = new Event({
    sharedBy: req.user.userId,
    title,
    bannerLink,
    organizer,
    dateAndTime,
    location,
    description,
    registrationLink,
  });

  try {
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: `Event ${id} updated`, event: updatedEvent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.sharedBy !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own events' });
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: `Event ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
