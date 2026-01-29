# EV Analytics — shadcn + Tailwind

Same Electric Vehicle Population Analytics app as the parent `memo` project, rebuilt with **shadcn/ui** and **Tailwind CSS** and a different design.

## Design differences from the MUI version

- **Stack**: shadcn (Radix primitives) + Tailwind CSS v4 instead of MUI.
- **Theme**: Zinc/slate-inspired palette with emerald/teal primary (oklch), light by default with `.dark` support.
- **Typography**: DM Sans (Google Fonts) instead of Roboto.
- **Layout**: Rounded cards (`rounded-xl`), subtle borders, backdrop blur on header and KPI cards.
- **Charts**: Recharts with theme-aware fills and tooltips; same data and logic.

## Setup

1. Install dependencies (from this folder):

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

The app expects `public/Electric_Vehicle_Population_Data.csv` (same as the MUI project). Copy it from the parent `memo/public` folder if needed.
