import SubAccount from '../model/subAccountTitleModel.js';
import AccountTitle from '../model/accountTitleModel.js';
import XLSX from 'xlsx';

export const getSubAccount = async (req, res) => {
  try {
    const result = await SubAccount.findAll({
      include: [{ model: AccountTitle, as: 'account' }],
    });
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching sub-account:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getSubAccountById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await SubAccount.findByPk(id, {
      include: [{ model: AccountTitle, as: 'account' }],
    });

    if (!result) {
      return res.status(404).json({ message: 'Sub-account not found.' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching sub-account:', error);
    res.status(500).json({ message: error.message });
  }
};

export const postSubAccount = async (req, res) => {
  try {
    const {
      code,
      name,
      accountDept,
      accountList,
      accountListItem,
      accountId,
      isActive,
      updatedById,
    } = req.body;

    if (!code || !name) {
      return res.status(400).json({ message: 'Code and Name are required.' });
    }

    if (accountId !== null) {
      const accountExists = await AccountTitle.findByPk(accountId);
      if (!accountExists) {
        return res.status(400).json({ message: 'Selected account does not exist.' });
      }
    }

    const result = await SubAccount.create({
      code,
      name,
      accountDept,
      accountList,
      accountListItem,
      accountId,
      isActive,
      updatedById: req.user?.id || updatedById || null,
    });

    res.status(201).json({
      message: 'Created successfully.',
      data: result,
    });
  } catch (error) {
    console.error('Error creating sub-account:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSubAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      name,
      accountDept,
      accountList,
      accountListItem,
      accountId,
      isActive,
      updatedById,
    } = req.body;

    const subAccount = await SubAccount.findByPk(id);
    if (!subAccount) {
      return res.status(404).json({ message: 'Sub-account not found.' });
    }

    const parsedAccountId =
      accountId === '' || accountId === null || accountId === undefined
        ? null
        : parseInt(accountId, 10);

    subAccount.code = code ?? subAccount.code;
    subAccount.name = name ?? subAccount.name;
    subAccount.accountDept = accountDept ?? subAccount.accountDept;
    subAccount.accountList = accountList ?? subAccount.accountList;
    subAccount.accountListItem = accountListItem ?? subAccount.accountListItem;
    subAccount.accountId = parsedAccountId ?? subAccount.accountId;
    subAccount.isActive = isActive ?? subAccount.isActive;
    subAccount.updatedById = req.user?.id ?? updatedById ?? subAccount.updatedById;

    await subAccount.save();

    res.status(200).json({
      message: 'Updated successfully.',
      data: subAccount.toJSON(),
    });
  } catch (error) {
    console.error('Error updating sub-account:', error);
    res.status(500).json({
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

export const importExcel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!rows.length) {
      return res.status(400).json({ message: 'Excel file is empty or invalid' });
    }

    const userId = req.user?.id;

    const formattedRows = rows.map(row => ({
      code: row.code?.toString().trim() || '',
      name: row.name?.toString().trim() || '',
      accountDept: row.accountDept ?? false,
      accountList: row.accountList ?? false,
      accountListItem: row.accountListItem?.toString().trim() || '',
      accountId: row.accountId || null,
      isActive: true,
      updatedById: userId || null,
    }));

    await SubAccount.bulkCreate(formattedRows);

    res.status(200).json({
      message: 'Imported successfully!',
      count: formattedRows.length,
      updatedById: userId,
    });
  } catch (error) {
    console.error('Error importing Excel:', error);
    res.status(500).json({ message: 'Error importing Excel', error: error.message });
  }
};