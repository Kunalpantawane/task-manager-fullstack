const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    // Input validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ message: "Task title is required" });
    }

    if (title.length > 100) {
      return res.status(400).json({ message: "Task title must be less than 100 characters" });
    }

    if (description && description.length > 500) {
      return res.status(400).json({ message: "Task description must be less than 500 characters" });
    }

    const validPriorities = ['low', 'medium', 'high'];
    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Priority must be low, medium, or high" });
    }

    const task = new Task({ 
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      user: req.user.id 
    });
    
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("🔥 Error in createTask:", error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { completed, priority, sort } = req.query;
    
    let filter = { user: req.user.id };
    
    // Filter by completion status
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    // Filter by priority
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      filter.priority = priority;
    }
    
    let query = Task.find(filter);
    
    // Sorting
    if (sort) {
      switch (sort) {
        case 'newest':
          query = query.sort({ createdAt: -1 });
          break;
        case 'oldest':
          query = query.sort({ createdAt: 1 });
          break;
        case 'priority':
          query = query.sort({ priority: -1, createdAt: -1 });
          break;
        default:
          query = query.sort({ createdAt: -1 });
      }
    } else {
      query = query.sort({ createdAt: -1 });
    }
    
    const tasks = await query;
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error in getTasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed, priority } = req.body;
    
    // Validation for updates
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ message: "Task title cannot be empty" });
      }
      if (title.length > 100) {
        return res.status(400).json({ message: "Task title must be less than 100 characters" });
      }
    }

    if (description !== undefined && description !== null && description.length > 500) {
      return res.status(400).json({ message: "Task description must be less than 500 characters" });
    }

    if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ message: "Priority must be low, medium, or high" });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : '';
    if (completed !== undefined) updateData.completed = completed;
    if (priority !== undefined) updateData.priority = priority;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error in updateTask:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};
