import Account from '../model/accountTitleModel.js';
import XLSX from 'xlsx';

export const getAccount = async (req, res) => {
  try {
    const result = await Account.findAll({ raw: true });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const postAccount = async (req, res) => {
  try {
    const { code, name, accountType, reportType, lineItem, isActive, updatedById } = req.body;

    if (!code || !name) {
      return res.status(400).json({ message: 'Code and Name are required.' });
    }

    const result = await Account.create({
      code,
      name,
      accountType,
      reportType,
      lineItem,
      isActive,
      updatedById: req.user?.id || updatedById || null,
    });

    res.status(201).json({
      message: 'Created successfully.',
      data: result,
    });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Account.findByPk(id, { raw: true });

    if (!result) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching account by ID:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, accountType, reportType, lineItem, isActive, updatedById } = req.body;

    const account = await Account.findByPk(id);
    if (!account) {
      return res.status(404).json({ message: 'Account not found.' });
    }

    account.code = code ?? account.code;
    account.name = name ?? account.name;
    account.accountType = accountType ?? account.accountType;
    account.reportType = reportType ?? account.reportType;
    account.lineItem = lineItem ?? account.lineItem;
    account.isActive = isActive ?? account.isActive;
    account.updatedById = req.user?.id ?? updatedById ?? account.updatedById;

    await account.save();

    res.status(200).json({
      message: 'Updated successfully.',
      data: account.toJSON(),
    });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({
      message: 'Internal server error.',
      error: error.message,
    });
  }
};


export const importExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);

    const validData = jsonData.map(row => ({
      code: row.code?.toString().trim() || '',
      name: row.name?.toString().trim() || '',
      accountType: row.accountType?.toString().trim() || '',
      reportType: row.reportType?.toString().trim() || '',
      lineItem: row.lineItem?.toString().trim() || '',
      isActive: row.isActive ?? true, 
      updatedById: req.user?.id || null,
    }));

    for (const item of validData) {
      await Account.create(item);
    }

    res.status(200).json({ message: 'Import successful!' });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ message: 'Import failed', error: error.message });
  }
};