import { useTranslation } from 'react-i18next';
import type { SortOption, PerPage } from '../../../hooks/useCatalogParams.tsx';
import { Dropdown } from '../Dropdown';
import './CatalogControls.scss';

const PER_PAGE_OPTIONS: PerPage[] = [8, 16, 32];

interface Props {
  sort: SortOption;
  perPage: PerPage;
  onParamChange: (key: string, value: string) => void;
}

export function CatalogControls({ sort, perPage, onParamChange }: Props) {
  const { t } = useTranslation();

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'newest', label: t('catalog.sort.newest') },
    { value: 'oldest', label: t('catalog.sort.oldest') },
    { value: 'price-asc', label: t('catalog.sort.priceAsc') },
    { value: 'price-desc', label: t('catalog.sort.priceDesc') },
  ];

  const sortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ||
    t('catalog.sort.newest');

  return (
    <div className="catalog-controls">
      <div className="catalog-controls__select-wrap">
        <label
          className="catalog-controls__label"
          htmlFor="catalog-sort"
        >
          {t('catalog.sortBy')}
        </label>
        <Dropdown
          value={sortLabel}
          onChange={(value) => {
            const option = SORT_OPTIONS.find((o) => o.label === value);
            if (option) onParamChange('sort', option.value);
          }}
          options={SORT_OPTIONS.map((o) => o.label)}
          placeholder={t('catalog.sort.newest')}
        />
      </div>

      <div className="catalog-controls__select-wrap">
        <label
          className="catalog-controls__label"
          htmlFor="catalog-per-page"
        >
          {t('catalog.itemsOnPage')}
        </label>
        <Dropdown
          value={String(perPage)}
          onChange={(value) => onParamChange('perPage', value)}
          options={PER_PAGE_OPTIONS.map((n) => String(n))}
          placeholder="8"
        />
      </div>
    </div>
  );
}
