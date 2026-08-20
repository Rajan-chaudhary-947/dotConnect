import Job from '../models/job.model.js';

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  const { 
    role,
    company,
    location,
    type,
    description,
    applyLink } = req.body;
    
  try {
    const newJob = new Job({
      postedBy: req.user.userId,
      role,
      company,
      location,
      type,
      description,
      applyLink,
    });
    console.log(newJob);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const modifyJob = async (req, res) => {
  const { id } = req.params;
  const job = req.body;
  try {
    const updatedJob = await Job.findByIdAndUpdate(id, job, { new: true });
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(404).json({ message: 'Job not found' });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.postedBy.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'You can only delete your own jobs' });
    }
    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};