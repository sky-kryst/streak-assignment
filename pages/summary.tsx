import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import styles from "./summary.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Summary = ({
  latest,
  average,
  channelDist,
  goalsByCountry,
  topFiveCountries,
}: any) => {
  return (
    <div
      className=/* "h-screen w-screen flex flex-col bg-slate-500 p-3" */ {
        styles.Dashboard
      }
    >
      <div className={styles.Latest + " grid grid-cols-7 grid-rows-4 p-8"}>
        {Object.keys({ " ": 0, ...latest.Today }).map((element: any) => (
          <div
            className="text-neutral-100 flex justify-center items-center"
            key={String(element)}
          >
            {String(element)}
          </div>
        ))}
        {Object.keys(latest).map((element: any) =>
          Object.keys({ " ": 0, ...latest.Today }).map((rowElement) => {
            if (!latest[element][rowElement]) {
              return (
                <div
                  className="text-neutral-100 flex items-center"
                  key={String(element)}
                >
                  {String(element)}
                </div>
              );
            }
            return (
              <div
                className="grid grid-cols-4 border-t border-slate-400"
                key={String(element)}
              >
                <div className="text-neutral-100 text-right flex items-center col-start-2 truncate">
                  {String(latest[element][rowElement].value)}
                </div>
                <div
                  className={
                    latest[element][rowElement].trend === "up"
                      ? styles.UpArrow
                      : styles.DownArrow
                  }
                ></div>
              </div>
            );
          })
        )}
      </div>
      <div className={styles.Group}>
        <div className={styles.Average}>
          <Line
            options={lineChartOptions}
            data={{
              labels: Object.keys(average.Sessions).map((element) => element),
              datasets: Object.keys(average).map((element) => ({
                label: element,
                borderColor:
                  element === "Sessions"
                    ? "cyan"
                    : element === "New Users"
                    ? "red"
                    : "purple",
                backgroundColor:
                  element === "Sessions"
                    ? "cyan"
                    : element === "New Users"
                    ? "red"
                    : "purple",
                data: Object.values(average[element]),
                yAxisID: element === "New Users" ? "y1" : "y",
              })),
            }}
          />
        </div>
        <div className={styles.CountryDist}>
          <Bar
            options={verticalBarOptions}
            data={{
              datasets: Object.keys(channelDist).map((element) => ({
                label: element,
                backgroundColor: element === "Sessions" ? "cyan" : "purple",
                data: Object.values(channelDist[element]),
              })),
              labels: Object.keys(channelDist.Sessions).map(
                (element) => element
              ),
            }}
          />
        </div>
        <div className={styles.GoalsByCountry}>
          {/* <Image src={WorldSvg} alt="Picture of the author"  /> */}
        </div>
        <div className={styles.TopFiveCountries}>
          <Bar
            options={horizontalBarOptions}
            data={{
              datasets: Object.keys(topFiveCountries).map((element) => ({
                label: element,
                backgroundColor: element === "Sessions" ? "cyan" : "purple",
                data: Object.values(topFiveCountries[element]),
              })),
              labels: Object.keys(topFiveCountries.Sessions).map(
                (element) => element
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

const verticalBarOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
  maintainAspectRatio: false,
};

const horizontalBarOptions = {
  indexAxis: "y" as const,
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
  maintainAspectRatio: false,
};

const lineChartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
    legend: {
      position: "bottom" as const,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
    },
  },
};

export default Summary;

export async function getServerSideProps() {
  return {
    props: {
      latest: {
        Today: {
          Sessions: { value: "gdfgdf", trend: "up" },
          "New Users": { value: "dsfdgh", trend: "down" },
          "Bounce Rate": { value: "tgvv", trend: "up" },
          "Avg. Session Duration": { value: "sgb", trend: "down" },
          "Goal 1 Comp.": { value: "setgb", trend: "up" },
          "Goal 1 CVR": { value: "sgrgb", trend: "down" },
        },
        "This Week": {
          Sessions: { value: "sdgbd", trend: "up" },
          "New Users": { value: "stvsd", trend: "down" },
          "Bounce Rate": { value: "vdhfsd", trend: "up" },
          "Avg. Session Duration": { value: "dgvf", trend: "down" },
          "Goal 1 Comp.": { value: "fsdhg", trend: "up" },
          "Goal 1 CVR": { value: "adrh", trend: "down" },
        },
        "This Month": {
          Sessions: { value: "adhrf", trend: "up" },
          "New Users": { value: "adgry", trend: "down" },
          "Bounce Rate": { value: "adrgh", trend: "up" },
          "Avg. Session Duration": { value: "ahhyr", trend: "down" },
          "Goal 1 Comp.": { value: "agdharhb", trend: "up" },
          "Goal 1 CVR": { value: "vdafg", trend: "down" },
        },
      },
      average: {
        Sessions: {
          "2019-01-20": 6456,
          "2019-dfd": 4566,
          "2019-fdf": 5243,
          "2019-dfds": 3543,
          "2019-dsf": 6345,
          "2019-sdf": 5224,
          "2019-dsff": 3433,
          "2019-dfsd": 4424,
          "2019-sgsg": 2452,
          "2019-sdg": 4202,
          "2019-sgv": 2452,
          "2019-efs": 4520,
          "2019-dsv": 1525,
          "2019-dv": 872,
          "2019-cvdf": 1000,
          "2019-dvsd": 5250,
        },
        "New Users": {
          "2019-01-20": 528,
          "2019-dfd": 543,
          "2019-fdf": 254,
          "2019-dfds": 254,
          "2019-dsf": 543,
          "2019-sdf": 453,
          "2019-dsff": 453,
          "2019-dfsd": 825,
          "2019-sgsg": 546,
          "2019-sdg": 245,
          "2019-sgv": 582,
          "2019-efs": 254,
          "2019-dsv": 804,
          "2019-dv": 538,
          "2019-cvdf": 411,
          "2019-dvsd": 345,
        },
        "Avg. Session Duration": {
          "2019-01-20": 2254,
          "2019-dfd": 4657,
          "2019-fdf": 4156,
          "2019-dfds": 5454,
          "2019-dsf": 4120,
          "2019-sdf": 5483,
          "2019-dsff": 1442,
          "2019-dfsd": 4145,
          "2019-sgsg": 5416,
          "2019-sdg": 4685,
          "2019-sgv": 1526,
          "2019-efs": 5751,
          "2019-dsv": 5248,
          "2019-dv": 2456,
          "2019-cvdf": 2546,
          "2019-dvsd": 1538,
        },
      },
      channelDist: {
        Sessions: {
          "Organic Search": 13000,
          Direct: 9000,
          "Paid Search": 6000,
          Social: 5000,
          Referral: 5000,
          Email: 2000,
        },
        "Bounce Rate": {
          "Organic Search": 13000 * 0.72,
          Direct: 13000 * 0.49,
          "Paid Search": 13000 * 0.59,
          Social: 13000 * 0.71,
          Referral: 13000 * 0.54,
          Email: 13000 * 0.62,
        },
      },
      goalsByCountry: {},
      topFiveCountries: {
        Sessions: {
          "United States of America": 23000,
          India: 4700,
          "United Kingdom": 3200,
          Canada: 2300,
          Germany: 1200,
        },
        "Bounce Rate": {
          "United States of America": 23000 * 0.64,
          India: 23000 * 0.6,
          "United Kingdom": 23000 * 0.6,
          Canada: 23000 * 0.72,
          Germany: 23000 * 0.66,
        },
      },
    },
  };
}
