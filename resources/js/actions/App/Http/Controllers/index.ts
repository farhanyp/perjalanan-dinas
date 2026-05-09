import IslandController from './IslandController'
import ProvinceController from './ProvinceController'
import CityController from './CityController'
import DocumentController from './DocumentController'
import Settings from './Settings'
const Controllers = {
    IslandController: Object.assign(IslandController, IslandController),
ProvinceController: Object.assign(ProvinceController, ProvinceController),
CityController: Object.assign(CityController, CityController),
DocumentController: Object.assign(DocumentController, DocumentController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers