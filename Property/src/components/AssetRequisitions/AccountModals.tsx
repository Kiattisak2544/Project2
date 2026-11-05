import Modal from '../ui/Modal';
import RequesterInfo from '../../pages/RequesterInfo';

const closeBtn =
  'w-8 h-8 text-on-surface-variant hover:text-on-surface rounded-lg hover:bg-surface-container transition flex items-center justify-center cursor-pointer';
const secondaryBtn =
  'px-4 py-2 text-xs bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface-variant hover:text-on-surface font-semibold transition cursor-pointer';

// ---------- Profile Modal ----------
export function ProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      {(close) => (
        <div className="bg-surface-container-lowest text-on-surface rounded-xl overflow-hidden shadow-xl border border-outline-variant/30 p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
            <h3 className="text-base font-bold text-on-surface">โปรไฟล์ส่วนตัว</h3>
            <button type="button" onClick={close} className={closeBtn} aria-label="ปิด">✕</button>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <RequesterInfo />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={close} className={secondaryBtn}>ปิด</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ---------- Settings Modal ----------
export interface Settings {
  reduceMotion: boolean;
  showToasts: boolean;
}

interface SettingsModalProps {
  settings: Settings;
  onChange: (settings: Settings) => void;
  onClose: () => void;
}

function Toggle({ checked, onChange, label, hint }: { checked: boolean; onChange: (v: boolean) => void; label: string; hint: string }) {
  return (
    <label className="flex items-center justify-between gap-4 p-3 rounded-xl border border-outline-variant/50 hover:border-secondary hover:bg-surface-container-low transition cursor-pointer">
      <span>
        <span className="block text-xs font-semibold text-on-surface">{label}</span>
        <span className="block text-[11px] text-on-surface-variant mt-0.5">{hint}</span>
      </span>
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="relative shrink-0 w-10 h-6 rounded-full bg-surface-container-high transition-colors duration-200 peer-checked:bg-primary-container peer-focus-visible:ring-2 peer-focus-visible:ring-secondary/30 after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-200 peer-checked:after:translate-x-4" />
    </label>
  );
}

export function SettingsModal({ settings, onChange, onClose }: SettingsModalProps) {
  return (
    <Modal onClose={onClose}>
      {(close) => (
        <div className="bg-surface-container-lowest text-on-surface rounded-xl overflow-hidden shadow-xl border border-outline-variant/30 p-6 space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
            <h3 className="text-base font-bold text-on-surface">ตั้งค่าบัญชี</h3>
            <button type="button" onClick={close} className={closeBtn} aria-label="ปิด">✕</button>
          </div>
          <div className="space-y-2 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <Toggle
              label="ลดการเคลื่อนไหว (Reduce Motion)"
              hint="ลดเอฟเฟกต์แอนิเมชันเพื่อความสบายตาและประสิทธิภาพ"
              checked={settings.reduceMotion}
              onChange={(v) => onChange({ ...settings, reduceMotion: v })}
            />
            <Toggle
              label="การแจ้งเตือนแบบป๊อปอัป (Toast)"
              hint="แสดงการแจ้งเตือนเมื่ออนุมัติ ปฏิเสธ หรือบันทึกข้อมูล"
              checked={settings.showToasts}
              onChange={(v) => onChange({ ...settings, showToasts: v })}
            />
          </div>
          <div className="flex justify-end pt-2">
            <button type="button" onClick={close} className={secondaryBtn}>เรียบร้อย</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ---------- Logout Modal ----------
export function LogoutModal({ onConfirm, onClose }: { onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal onClose={onClose} maxWidth="max-w-sm">
      {(close) => (
        <div className="bg-surface-container-lowest text-on-surface rounded-xl overflow-hidden shadow-xl border border-outline-variant/30 p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-error-container text-xl flex items-center justify-center animate-pop-in">🚪</div>
          <h3 className="mt-4 text-base font-bold text-on-surface">ต้องการออกจากระบบ?</h3>
          <p className="mt-1 text-xs text-on-surface-variant">คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบจัดการสินทรัพย์?</p>
          <div className="mt-6 grid grid-cols-2 gap-2">
            <button type="button" onClick={close} className={secondaryBtn}>ยกเลิก</button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 text-xs font-semibold text-on-error rounded-lg bg-error hover:bg-error/90 shadow-sm transition cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
