import styles from "../styles/components/EventsList.module.scss";

interface EventsListProps {
  className?: string;
}
export function EventsList(props: EventsListProps) {
  return (
    <div className={`${styles.eventsList} ${props.className}`}>
    </div>
  );
}
