import { MegaMenuModel } from "../../../Database/models/megamenu.model.js";

const createMegaMenu = async (req, res) => {
  try {
    const { name, items } = req.body;
    const newMegaMenu = new MegaMenuModel({ name, items });
    const savedMegaMenu = await newMegaMenu.save();
    res.status(201).json(savedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllMegaMenus = async (req, res) => {
  try {
    const megaMenus = await MegaMenuModel.find();
    res.status(200).json(megaMenus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMegaMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    res.status(200).json(megaMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMegaMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;
    const updatedMegaMenu = await MegaMenuModel.findByIdAndUpdate(
      id,
      { name, items },
      { new: true }
    );
    if (!updatedMegaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMegaMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMegaMenu = await MegaMenuModel.findByIdAndDelete(id);
    if (!deletedMegaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    res.status(200).json({ message: "Mega Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItemToMegaMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const newItem = req.body;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    megaMenu.items.push(newItem);
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeItemFromMegaMenu = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    megaMenu.items = megaMenu.items.filter((item) => item.id !== itemId);
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateItemInMegaMenu = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const updatedItem = req.body;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const itemIndex = megaMenu.items.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }
    megaMenu.items[itemIndex] = {
      ...megaMenu.items[itemIndex],
      ...updatedItem,
    };
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addColumnToMegaMenuItem = async (req, res) => {
  try {
    const { id, itemId } = req.params;
    const newColumn = req.body;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const item = megaMenu.items.find((item) => item.id === itemId);
    console.log(item);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    item.columns.push(newColumn);
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeColumnFromMegaMenuItem = async (req, res) => {
  try {
    const { id, itemId, columnId } = req.params;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const item = megaMenu.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    item.columns = item.columns.filter((column) => column.id !== columnId);
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateColumnInMegaMenuItem = async (req, res) => {
  try {
    const { id, itemId, columnId } = req.params;
    const updatedColumn = req.body;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const item = megaMenu.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const columnIndex = item.columns.findIndex(
      (column) => column.id === columnId
    );
    if (columnIndex === -1) {
      return res.status(404).json({ message: "Column not found" });
    }
    item.columns[columnIndex] = {
      ...item.columns[columnIndex],
      ...updatedColumn,
    };
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addSubItemToColumn = async (req, res) => {
  try {
    const { id, itemId, columnId } = req.params;
    const newSubItem = req.body;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const item = megaMenu.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const column = item.columns.find((column) => column.id === columnId);
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }
    column.items.push(newSubItem);
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeSubItemFromColumn = async (req, res) => {
  try {
    const { id, itemId, columnId, subItemId } = req.params;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const item = megaMenu.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const column = item.columns.find((column) => column.id === columnId);
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }
    column.items = column.items.filter((item) => item.id !== subItemId);
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSubItemInColumn = async (req, res) => {
  try {
    const { id, itemId, columnId, subItemId } = req.params;
    const updatedSubItem = req.body;
    const megaMenu = await MegaMenuModel.findById(id);
    if (!megaMenu) {
      return res.status(404).json({ message: "Mega Menu not found" });
    }
    const item = megaMenu.items.find((item) => item.id === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    const column = item.columns.find((column) => column.id === columnId);
    if (!column) {
      return res.status(404).json({ message: "Column not found" });
    }
    const subItemIndex = column.items.findIndex(
      (item) => item.id === subItemId
    );
    if (subItemIndex === -1) {
      return res.status(404).json({ message: "Sub-Item not found" });
    }
    
    const existingSubItem = column.items[subItemIndex];
    const finalSubItem = {
      id: existingSubItem.id,
      title: updatedSubItem.title || existingSubItem.title,
      url: updatedSubItem.url || existingSubItem.url,
    };

    // Update the sub-item
    column.items[subItemIndex] = finalSubItem;

    // Save the updated mega menu
    const updatedMegaMenu = await megaMenu.save();
    res.status(200).json(updatedMegaMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createMegaMenu,
  getAllMegaMenus,
  getMegaMenuById,
  updateMegaMenu,
  deleteMegaMenu,
  addItemToMegaMenu,
  removeItemFromMegaMenu,
  updateItemInMegaMenu,
  addColumnToMegaMenuItem,
  removeColumnFromMegaMenuItem,
  updateColumnInMegaMenuItem,
  addSubItemToColumn,
  removeSubItemFromColumn,
  updateSubItemInColumn,
};
