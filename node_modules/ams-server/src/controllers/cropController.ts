import { Request, Response } from 'express';

export interface CropItem {
  id: string;
  farmerId: string;
  farmerName: string;
  cropName: string;
  category: string;
  season: string;
  areaPlantedHa: number;
  expectedYieldTon: number;
  actualYieldTon: number | null;
  status: string;
  plantingDate: string;
  harvestDate: string | null;
}

export let mockCrops: CropItem[] = [
  {
    id: 'crop-101',
    farmerId: 'f-101',
    farmerName: 'Abdi Hassan Nur',
    cropName: 'Sesame (Sisim)',
    category: 'Oilseed',
    season: 'GU_SPRING',
    areaPlantedHa: 8.5,
    expectedYieldTon: 12.0,
    actualYieldTon: 11.8,
    status: 'HARVESTED',
    plantingDate: '2026-04-10',
    harvestDate: '2026-07-20',
  },
  {
    id: 'crop-102',
    farmerId: 'f-101',
    farmerName: 'Abdi Hassan Nur',
    cropName: 'Maize (Sorbey)',
    category: 'Cereal',
    season: 'DER_AUTUMN',
    areaPlantedHa: 4.0,
    expectedYieldTon: 8.0,
    actualYieldTon: null,
    status: 'GROWING',
    plantingDate: '2026-06-01',
    harvestDate: '2026-09-15',
  },
  {
    id: 'crop-103',
    farmerId: 'f-102',
    farmerName: 'Fadumo Omar Ali',
    cropName: 'Watermelon',
    category: 'Fruit',
    season: 'GU_SPRING',
    areaPlantedHa: 3.5,
    expectedYieldTon: 15.0,
    actualYieldTon: 16.2,
    status: 'HARVESTED',
    plantingDate: '2026-03-20',
    harvestDate: '2026-06-28',
  },
  {
    id: 'crop-104',
    farmerId: 'f-103',
    farmerName: 'Mohamud Farah Ibrahim',
    cropName: 'Tomatoes',
    category: 'Vegetable',
    season: 'XAGAAG_SUMMER',
    areaPlantedHa: 10.0,
    expectedYieldTon: 35.0,
    actualYieldTon: null,
    status: 'HARVEST_READY',
    plantingDate: '2026-05-05',
    harvestDate: '2026-08-01',
  }
];

export const getCrops = async (req: Request, res: Response) => {
  const { search, status, season, category } = req.query;

  let filtered = [...mockCrops];

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(c =>
      c.cropName.toLowerCase().includes(q) ||
      c.farmerName.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }

  if (status) {
    filtered = filtered.filter(c => c.status === String(status));
  }

  if (season) {
    filtered = filtered.filter(c => c.season === String(season));
  }

  return res.json({
    success: true,
    data: filtered,
    summary: {
      totalPlantedAreaHa: filtered.reduce((acc, c) => acc + c.areaPlantedHa, 0),
      totalExpectedYieldTon: filtered.reduce((acc, c) => acc + c.expectedYieldTon, 0),
      totalHarvestedTon: filtered.reduce((acc, c) => acc + (c.actualYieldTon || 0), 0)
    }
  });
};

export const createCrop = async (req: Request, res: Response) => {
  const { farmerId, farmerName, cropName, category, season, areaPlantedHa, expectedYieldTon, plantingDate } = req.body;

  const newCrop: CropItem = {
    id: `crop-${Date.now()}`,
    farmerId: farmerId || 'f-101',
    farmerName: farmerName || 'Abdi Hassan Nur',
    cropName,
    category: category || 'Cereal',
    season: season || 'GU_SPRING',
    areaPlantedHa: parseFloat(areaPlantedHa),
    expectedYieldTon: parseFloat(expectedYieldTon),
    actualYieldTon: null,
    status: 'PLANTED',
    plantingDate,
    harvestDate: null
  };

  mockCrops.unshift(newCrop);
  return res.status(201).json({ success: true, message: 'Crop registered successfully', data: newCrop });
};

export const updateCropStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, actualYieldTon, harvestDate } = req.body;

  const crop = mockCrops.find(c => c.id === id);
  if (!crop) {
    return res.status(404).json({ success: false, error: 'Crop record not found' });
  }

  if (status) crop.status = status;
  if (actualYieldTon !== undefined) crop.actualYieldTon = parseFloat(actualYieldTon);
  if (harvestDate) crop.harvestDate = harvestDate;

  return res.json({ success: true, message: 'Crop status updated', data: crop });
};

export const deleteCrop = async (req: Request, res: Response) => {
  const index = mockCrops.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Crop record not found' });
  }

  mockCrops.splice(index, 1);
  return res.json({ success: true, message: 'Crop record removed' });
};
